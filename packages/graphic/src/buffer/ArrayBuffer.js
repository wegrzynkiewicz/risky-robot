import AbstractBuffer from "./AbstractBuffer";

const openGLBufferType = WebGL2RenderingContext["ARRAY_BUFFER"];

export default class ArrayBuffer extends AbstractBuffer {

    constructor({view, name, usage, bufferLayout}) {
        super({view, name, usage, openGLBufferType});
        this.bufferLayout = bufferLayout;
    }
}
