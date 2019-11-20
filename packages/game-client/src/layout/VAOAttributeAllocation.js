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
        this.attributeLayout.write(dataView, this.calculateOffset(vertexIndex), value);
    }

    read(dataView, vertexIndex) {
        return this.attributeLayout.read(dataView, this.calculateOffset(vertexIndex));
    }
}
