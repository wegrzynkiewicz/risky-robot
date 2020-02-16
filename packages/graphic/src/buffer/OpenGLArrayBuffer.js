export default class OpenGLArrayBuffer {

    constructor({openGL, name, bufferLayout}) {
        this.name = name;
        this.openGL = openGL;
        this.openGLBufferPointer = openGL.createBuffer();
        this.openGLBufferType = WebGL2RenderingContext["ARRAY_BUFFER"];
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
