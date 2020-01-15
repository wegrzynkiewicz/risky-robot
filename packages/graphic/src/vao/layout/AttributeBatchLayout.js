import AttributeBatchAllocation from "../allocation/AttributeBatchAllocation";

export default class AttributeBatchLayout {

    constructor({attributes}) {
        this.attributeLayouts = [...attributes];
    }

    calculateByteStride() {
        let blockStride = 0;
        for (let attributeLayout of this.attributeLayouts) {
            blockStride += attributeLayout.type.byteLength;
        }
        for (let attributeLayout of this.attributeLayouts) {
            if (blockStride % attributeLayout.type.glTypeStride !== 0) {
                throw new Error("Invalid stride or offset data pack");
            }
        }
        return blockStride;
    }

    assertSameDivisor() {
        if (this.attributeLayouts.length > 1) {
            const expectedDivisor = this.attributeLayouts[0].divisor;
            for (let attributeLayout of this.attributeLayouts) {
                if (attributeLayout.divisor !== expectedDivisor) {
                    throw new Error("Cannot merge interleaved attributes with different divisor property");
                }
            }
        }
    }

    createAttributeBatchAllocation({allocation, batchOffset}) {
        this.assertSameDivisor();

        const byteStride = this.calculateByteStride();
        const attributeBatchAllocation = new AttributeBatchAllocation();

        let byteOffset = batchOffset;
        for (let attributeLayout of this.attributeLayouts) {
            const {name, type} = attributeLayout;
            const attributeAllocation = attributeLayout.createAttributeAllocation({
                allocation,
                byteOffset,
                byteStride,
            });
            byteOffset += type.byteLength;
            attributeBatchAllocation.attributeAllocationMap.set(name, attributeAllocation);
        }

        return attributeBatchAllocation;
    }

    calculateTotalByteLength(allocation) {
        let totalByteLength = 0;
        for (let attributeLayout of this.attributeLayouts) {
            totalByteLength += attributeLayout.calculateTotalByteLength(allocation);
        }
        return totalByteLength;
    }
}
