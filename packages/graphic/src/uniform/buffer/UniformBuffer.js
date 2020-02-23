import AbstractBuffer from "../../buffer/AbstractBuffer";

export default class UniformBuffer extends AbstractBuffer {

    constructor({name, usage, view}) {
        super({name, usage, view});
    }

    get openGLBufferType() {
        return WebGL2RenderingContext["UNIFORM_BUFFER"];
    }

    bindBufferBase(uniformBindingPoint) {
        return this.view.openGL.bindBufferBase(
            this.openGLBufferType,
            uniformBindingPoint.bindingIndex,
            this.openGLBufferPointer,
        );
    }

    bindBufferRange(uniformBindingPoint) {
        return this.view.openGL.bindBufferBase(
            this.openGLBufferType,
            uniformBindingPoint.bindingIndex,
            this.openGLBufferPointer,
            uniformBindingPoint.byteOffset,
            uniformBindingPoint.byteLength,
        );
    }
}
