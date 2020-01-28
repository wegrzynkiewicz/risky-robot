export default class ElementBufferLayout {

    constructor({name, byteLength}) {
        this.name = name;
        this.byteLength = byteLength;
        this.openGLBufferType = WebGLRenderingContext['ELEMENT_ARRAY_BUFFER'];
        this.openGLBufferTypeName = 'ELEMENT_ARRAY_BUFFER';
    }

    getIndexAccessor() {
    }

    createDataView() {
        const buffer = new ArrayBuffer(this.bufferLength);
        const dataView = new DataView(buffer);

        return dataView;
    }
}
