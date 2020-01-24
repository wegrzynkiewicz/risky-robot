import OpenGLBuffer from "./OpenGLBuffer";

export default class BufferManager {

    constructor({view}) {
        this.view = view;
        this.buffers = Object.create(null);
    }

    getBufferByName(bufferName) {
        return this.buffers[bufferName];
    }

    createBuffer({name, type, bufferLayout}) {
        const {openGL} = this.view;
        const buffer = new OpenGLBuffer({openGL, name, type, bufferLayout});
        this.buffers[name] = buffer;
        return buffer;
    }
}
