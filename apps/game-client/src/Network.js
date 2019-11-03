import WebSocketConnection from "./WebSocketConnection";
import EventEmitter from "./helpers/EventEmitter"
import MessageSymbol from "../../../lib/network/communication/messageSymbol";
import messageRegistry from "../../../lib/network/communication/messageRegistry";
import MessageSerializer from "../../../lib/network/communication/serialization/MessageSerializer";

export default class Network extends EventEmitter {

    constructor() {
        super();

        this.messageSerializer = new MessageSerializer(messageRegistry);

        const url = 'ws://172.16.1.124:8080';
        this.wsConnection = new WebSocketConnection(url);
        this.wsConnection.on('data', event => {
            const {data} = event;
            const message = this.messageSerializer.deserialize(data);
            const messageName = message[MessageSymbol];
            this.emit("message", message);
            this.emit(`message:${messageName}`, message);
        });
    }

    sendMessage(message) {
        const serializedMessage = this.messageSerializer.serialize(message);
        this.wsConnection.send(serializedMessage);
    }
}
