import AbstractBuffer from './AbstractBuffer';

export default class ElementArrayBuffer extends AbstractBuffer {

    constructor({bufferLayout, name, usage, view}) {
        super({name, usage, view});
        this.bufferLayout = bufferLayout;
    }

    get openGLBufferType() {
        return WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER;
    }
}
