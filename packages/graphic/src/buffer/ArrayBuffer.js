import AbstractBuffer from './AbstractBuffer';

export default class ArrayBuffer extends AbstractBuffer {

    constructor({view, name, usage, bufferLayout}) {
        super({view, name, usage});
        this.bufferLayout = bufferLayout;
    }

    get openGLBufferType() {
        return WebGL2RenderingContext.ARRAY_BUFFER;
    }
}
