import AbstractBuffer from './AbstractBuffer';

export default class ElementArrayBuffer extends AbstractBuffer {

    constructor({view, name, usage, bufferLayout}) {
        super({view, name, usage});
        this.bufferLayout = bufferLayout;
    }

    get openGLBufferType() {
        return WebGL2RenderingContext['ELEMENT_ARRAY_BUFFER'];
    }
}
