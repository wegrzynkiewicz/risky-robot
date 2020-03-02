import EventEmitter from './helpers/EventEmitter'

export default class WebSocketConnection extends EventEmitter {

    constructor(url) {
        super();

        this.socket = new WebSocket(url);
        this.socket.binaryType = 'arraybuffer';

        this.socket.addEventListener('message', (event) => {
            this.emit('data', event);
        });

        this.socket.addEventListener('close', function () {
            console.log('close', arguments);
        });
    }

    send(data) {
        this.socket.send(data);
    }
}
