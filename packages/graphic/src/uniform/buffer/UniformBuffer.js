import AbstractBuffer from "../../buffer/AbstractBuffer";

const openGLBufferType = WebGL2RenderingContext["UNIFORM_BUFFER"];

export default class UniformBuffer extends AbstractBuffer {

    constructor({view, name, usage}) {
        super({view, name, usage, openGLBufferType});
    }
}
