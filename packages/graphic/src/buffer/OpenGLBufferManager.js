import OpenGLArrayBuffer from "./OpenGLArrayBuffer";
import OpenGLElementBuffer from "./OpenGLElementBuffer";

export default class BufferManager {

    constructor({view}) {
        this.view = view;
        this.buffers = Object.create(null);
    }

    getBufferByName(bufferName) {
        return this.buffers[bufferName];
    }

    createArrayBuffer({name, bufferLayout}) {
        const {openGL} = this.view;
        const buffer = new OpenGLArrayBuffer({openGL, name, bufferLayout});
        this.buffers[name] = buffer;
        return buffer;
    }

    createElementBuffer({name, bufferLayout}) {
        const {openGL} = this.view;
        const buffer = new OpenGLElementBuffer({openGL, name, bufferLayout});
        this.buffers[name] = buffer;
        return buffer;
    }
}
