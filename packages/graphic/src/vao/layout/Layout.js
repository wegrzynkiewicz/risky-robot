export default class Layout {

    constructor({allocation}) {
        this.allocation = allocation;
        this.bufferLayoutMap = new Map();
        this.attributeLayoutMap = new Map();
        this.accessorMap = new Map();
    }
}
