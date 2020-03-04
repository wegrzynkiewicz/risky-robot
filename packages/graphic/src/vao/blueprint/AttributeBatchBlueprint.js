import * as Binary from 'robo24-binary';
import AttributeBatchLayout from '../layout/AttributeBatchLayout';

export default class AttributeBatchBlueprint {

    constructor({attributeBlueprints}) {
        this.attributeBlueprints = [...attributeBlueprints];
    }

    calculateByteStride() {
        let blockStride = 0;
        for (const attributeBlueprint of this.attributeBlueprints) {
            blockStride += attributeBlueprint.type.byteLength;
        }
        for (const attributeBlueprint of this.attributeBlueprints) {
            const {type} = attributeBlueprint;
            const paddingType = type instanceof Binary.GenericType ? type.axisType : type;
            if (blockStride % paddingType.byteLength !== 0) {
                throw new Error('Invalid stride or offset data pack');
            }
        }
        return blockStride;
    }

    assertSameDivisor() {
        if (this.attributeBlueprints.length > 1) {
            const expectedDivisor = this.attributeBlueprints[0].divisor;
            for (const attributeBlueprint of this.attributeBlueprints) {
                if (attributeBlueprint.divisor !== expectedDivisor) {
                    throw new Error('Cannot merge interleaved attributes with different divisor property');
                }
            }
        }
    }

    createAttributeBatchLayout({allocation, batchOffset}) {
        this.assertSameDivisor();

        const byteStride = this.calculateByteStride();
        const attributeBatchLayout = new AttributeBatchLayout({
            byteLength: this.calculateTotalByteLength(allocation),
            byteOffset: batchOffset,
        });

        let byteOffset = batchOffset;
        for (const attributeBlueprint of this.attributeBlueprints) {
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
        for (const attributeBlueprint of this.attributeBlueprints) {
            const attributeByteLength = attributeBlueprint.calculateTotalByteLength(allocation);
            totalByteLength += attributeByteLength;
        }
        return totalByteLength;
    }
}
