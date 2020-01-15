export default class AttributeBatchLayout {

    constructor() {
        this.attributeLayouts = [];
    }

    addAttributeLayout(attributeLayout) {
        for (let existsAttributeLayout of this.attributeLayouts) {
            if (existsAttributeLayout.divisor !== attributeLayout.divisor) {
                throw new Error("Cannot merge interleaved attributes with different divisor property");
            }
        }
        this.attributeLayouts.push(attributeLayout);
    }

    calculateBlockStride() {
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

    createAttributeBatchAllocation() {

    }

    calculateTotalByteLength(allocation) {

    }
}
