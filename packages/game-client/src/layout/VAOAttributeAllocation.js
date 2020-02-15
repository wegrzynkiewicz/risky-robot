/**
 * @property {VAOLayout} vaoAllocation
 * @property {VAOAttributeLayout} vaoAttributeLayout
 */
export default class VAOAttributeAllocation {

    constructor({vaoAllocation, vaoAttributeLayout, stride, offset}) {
        this.vaoAllocation = vaoAllocation;
        this.vaoAttributeLayout = vaoAttributeLayout;
        this.stride = stride;
        this.offset = offset;
    }

    calculateOffset(vertexIndex) {
        return this.offset + (this.stride * vertexIndex);
    }

    getByteLength() {
        return this.vaoAttributeLayout.getByteLength({
            primitiveCount: this.vaoAllocation.elements,
            verticesCount: this.vaoAllocation.vertices,
        });
    }

    write(dataView, vertexIndex, value) {
        const index = this.calculateOffset(vertexIndex);
        this.vaoAttributeLayout.write(dataView, index, value);
    }

    read(dataView, vertexIndex) {
        const index = this.calculateOffset(vertexIndex);
        return this.vaoAttributeLayout.read(dataView, index);
    }
}
