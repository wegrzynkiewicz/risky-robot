export default class OpenGLBuffer {

    constructor({openGL, name, type, bufferLayout}) {
        const openGLBufferType = openGL[type];

        if (openGLBufferType === undefined) {
            throw new Error("Invalid buffer type.");
        }

        this.name = name;
        this.openGL = openGL;
        this.openGLBufferPointer = openGL.createBuffer();
        this.openGLBufferType = openGLBufferType;
        this.bufferLayout = bufferLayout;
    }

    bind() {
        this.openGL.bindBuffer(this.openGLBufferType, this.openGLBufferPointer);
    }

    unbind() {
        this.openGL.bindBuffer(this.openGLBufferType, null);
    }

    setDataView(dataView) {
        this.bind();
        this.openGL.bufferData(this.openGLBufferType, dataView, this.openGL.STATIC_DRAW);
    }
}
