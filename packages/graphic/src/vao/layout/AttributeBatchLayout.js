export default class AttributeBatchLayout {

    constructor({byteOffset}) {
        this.byteOffset = byteOffset;
        this.attributeLayoutMap = new Map();
    }
}
