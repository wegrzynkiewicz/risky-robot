import AttributeBatchLayout from "../layout/AttributeBatchLayout";

export default class AttributeBatchBlueprint {

    constructor({attributes}) {
        this.attributeBlueprints = [...attributes];
    }

    calculateByteStride() {
        let blockStride = 0;
        for (let attributeBlueprint of this.attributeBlueprints) {
            blockStride += attributeBlueprint.type.byteLength;
        }
        for (let attributeBlueprint of this.attributeBlueprints) {
            if (blockStride % attributeBlueprint.type.glTypeStride !== 0) {
                throw new Error("Invalid stride or offset data pack");
            }
        }
        return blockStride;
    }

    assertSameDivisor() {
        if (this.attributeBlueprints.length > 1) {
            const expectedDivisor = this.attributeBlueprints[0].divisor;
            for (let attributeBlueprint of this.attributeBlueprints) {
                if (attributeBlueprint.divisor !== expectedDivisor) {
                    throw new Error("Cannot merge interleaved attributes with different divisor property");
                }
            }
        }
    }

    createAttributeBatchLayout({allocation, batchOffset}) {
        this.assertSameDivisor();

        const byteStride = this.calculateByteStride();
        const attributeBatchLayout = new AttributeBatchLayout({
            byteOffset: batchOffset,
            byteLength: this.calculateTotalByteLength(allocation),
        });

        let byteOffset = batchOffset;
        for (let attributeBlueprint of this.attributeBlueprints) {
            const {name, type} = attributeBlueprint;
            const attributeLayout = attributeBlueprint.createAttributeAllocation({
                allocation,
                byteOffset,
                byteStride,
            });
            byteOffset += type.byteLength;
            attributeBatchLayout.attributeLayoutMap.set(name, attributeLayout);
        }

        return attributeBatchLayout;
    }

    calculateTotalByteLength(allocation) {
        let totalByteLength = 0;
        for (let attributeBlueprint of this.attributeBlueprints) {
            totalByteLength += attributeBlueprint.calculateTotalByteLength(allocation);
        }
        return totalByteLength;
    }
}
