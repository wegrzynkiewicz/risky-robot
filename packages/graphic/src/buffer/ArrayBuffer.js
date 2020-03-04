import AbstractBuffer from './AbstractBuffer';

export default class ArrayBuffer extends AbstractBuffer {

    constructor({bufferLayout, name, usage, view}) {
        super({name, usage, view});
        this.bufferLayout = bufferLayout;
    }

    get openGLBufferType() {
        return WebGL2RenderingContext.ARRAY_BUFFER;
    }
}
