export default class VAOAttributeAllocation {

    constructor({vaoLayout, attributeLayout, stride, offset}) {
        this.vaoLayout = vaoLayout;
        this.attributeLayout = attributeLayout;
        this.stride = stride;
        this.offset = offset;
    }

    calculateOffset(vertexIndex) {
        return this.offset + (this.stride * vertexIndex);
    }

    getByteLength() {
        return this.attributeLayout.getByteLength({
            elementsCount: this.vaoLayout.getElementsCount(),
            verticesCount: this.vaoLayout.getVerticesCount(),
        });
    }

    write(dataView, vertexIndex, value) {
        const index = this.calculateOffset(vertexIndex);
        this.attributeLayout.write(dataView, index, value);
    }

    read(dataView, vertexIndex) {
        const index = this.calculateOffset(vertexIndex);
        return this.attributeLayout.read(dataView, index);
    }
}
