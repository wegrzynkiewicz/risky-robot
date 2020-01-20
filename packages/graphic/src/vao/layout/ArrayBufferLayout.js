export default class ArrayBufferLayout {

    constructor({byteLength}) {
        this.byteLength = byteLength;
        this.attributeBatchLayoutSet = new Set();
    }

    getAccessorByName(accessorName) {
        for (const {attributeLayoutMap} of this.attributeBatchLayoutSet.values()) {
            if (attributeLayoutMap.has(attributeLayoutName)) {
                const attributeLayout = attributeLayoutMap.get(accessorName);
                const attributeAccessor = attributeLayout.getAccessor();

                return attributeAccessor;
            }
        }
        throw new Error(`Not found Accessor named (${accessorName})`);
    }

    getAttributeLayoutByName(attributeLayoutName) {
        for (const {attributeLayoutMap} of this.attributeBatchLayoutSet.values()) {
            if (attributeLayoutMap.has(attributeLayoutName)) {
                return attributeLayoutMap.get(attributeLayoutName);
            }
        }
        throw new Error(`Not found AttributeLayout named (${attributeLayoutName})`);
    }

    createDataView() {
        const buffer = new ArrayBuffer(this.bufferLength);
        const dataView = new DataView(buffer);

        return dataView;
    }
}
