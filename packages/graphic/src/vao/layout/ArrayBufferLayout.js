export default class ArrayBufferLayout {

    constructor({byteLength}) {
        this.byteLength = byteLength;
        this.attributeBatchLayoutSet = new Set();
    }

    getAttributeLayoutByName(attributeLayoutName) {
        for (const {attributeLayoutMap} of this.attributeBatchLayoutSet.values()) {
            if (attributeLayoutMap.has(attributeLayoutName)) {
                return attributeLayoutMap.get(attributeLayoutName);
            }
        }
        throw new Error(`Not found AttributeLayout named (${attributeLayoutName})`);
    }

    createArrayBufferByDataView() {
        const buffer = new ArrayBuffer(this.bufferLength);
        const dataView = new DataView(buffer);

        return dataView;
    }
}
