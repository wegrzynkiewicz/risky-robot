import AbstractBuffer from "../../buffer/AbstractBuffer";

export default class UniformBuffer extends AbstractBuffer {

    constructor({view, name, usage}) {
        super({view, name, usage});
    }

    get openGLBufferType() {
        return WebGL2RenderingContext["UNIFORM_BUFFER"];
    }
}
