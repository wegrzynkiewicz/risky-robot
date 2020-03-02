import ArrayBuffer from './ArrayBuffer';
import ElementArrayBuffer from './ElementArrayBuffer';

export default class BufferManager {

    constructor({view}) {
        this.view = view;
        this.buffers = Object.create(null);
    }

    getBufferByName(bufferName) {
        return this.buffers[bufferName];
    }

    createArrayBuffer({name, usage, bufferLayout}) {
        const {view} = this;
        const buffer = new ArrayBuffer({view, name, usage, bufferLayout});
        this.buffers[name] = buffer;
        return buffer;
    }

    createElementArrayBuffer({name, usage, bufferLayout}) {
        const {view} = this;
        const buffer = new ElementArrayBuffer({view, name, usage, bufferLayout});
        this.buffers[name] = buffer;
        return buffer;
    }
}
