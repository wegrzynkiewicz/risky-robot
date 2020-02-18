import AbstractBuffer from "./AbstractBuffer";

const openGLBufferType = WebGL2RenderingContext["ELEMENT_ARRAY_BUFFER"];

export default class ElementArrayBuffer extends AbstractBuffer {

    constructor({view, name, usage, bufferLayout}) {
        super({view, name, usage, openGLBufferType});
        this.bufferLayout = bufferLayout;
    }
}
