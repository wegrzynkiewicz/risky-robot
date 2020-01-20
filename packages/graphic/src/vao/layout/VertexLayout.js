export default class VertexLayout {

    constructor({allocation}) {
        this.allocation = allocation;
        this.bufferLayoutMap = new Map();
    }

    getBufferLayout(bufferName) {
        return this.bufferLayoutMap.get(bufferName);
    }
}
