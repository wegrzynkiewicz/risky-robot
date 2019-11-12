import WebSocketConnection from "./WebSocketConnection";
import EventEmitter from "./helpers/EventEmitter"
import actionRegistry from "../../../lib/logic/actions/actionRegistry";
import MessageSerializer from "../../../lib/network/communication/serialization/MessageSerializer";
import Message from "../../../lib/network/communication/Message";

export default class Network extends EventEmitter {

    constructor() {
        super();

        this.messageSerializer = new MessageSerializer(actionRegistry);

        const url = 'ws://172.16.1.124:8080';
        this.wsConnection = new WebSocketConnection(url);
        this.wsConnection.on('data', event => {
            const {data} = event;
            const message = this.messageSerializer.deserialize(data);
            this.emit("message", message);
            this.emit(`message:${message.code}`, message);
        });
    }

    sendMessage(action) {
        const message = Message.createFromAction(action);
        const serializedMessage = this.messageSerializer.serialize(message);
        this.wsConnection.send(serializedMessage);
    }
}
