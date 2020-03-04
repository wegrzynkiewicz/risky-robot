import ArrayBuffer from './ArrayBuffer';
import ElementArrayBuffer from './ElementArrayBuffer';

export default class BufferManager {

    constructor({view}) {
        this.view = view;
        this.buffersMap = new Map();
    }

    getBufferByName(bufferName) {
        return this.buffersMap.get(bufferName);
    }

    createArrayBuffer({bufferLayout, name, usage}) {
        const {view} = this;
        const buffer = new ArrayBuffer({bufferLayout, name, usage, view});
        this.buffersMap.set(name, buffer);
        return buffer;
    }

    createElementArrayBuffer({bufferLayout, name, usage}) {
        const {view} = this;
        const buffer = new ElementArrayBuffer({bufferLayout, name, usage, view});
        this.buffersMap.set(name, buffer);
        return buffer;
    }
}
