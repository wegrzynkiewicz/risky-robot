import AbstractBuffer from '../../buffer/AbstractBuffer';

export default class UniformBuffer extends AbstractBuffer {

    get openGLBufferType() {
        return WebGL2RenderingContext.UNIFORM_BUFFER;
    }

    bindBufferBase(uniformBindingPoint) {
        return this.view.openGL.bindBufferBase(
            WebGL2RenderingContext.UNIFORM_BUFFER,
            uniformBindingPoint.bindingIndex,
            this.openGLBufferPointer,
        );
    }

    bindBufferRange(uniformBindingPoint) {
        return this.view.openGL.bindBufferBase(
            WebGL2RenderingContext.UNIFORM_BUFFER,
            uniformBindingPoint.bindingIndex,
            this.openGLBufferPointer,
            uniformBindingPoint.byteOffset,
            uniformBindingPoint.byteLength,
        );
    }
}
