import Message from "../Message";
import BinaryDescriptor from "../../../binary/BinaryDescriptor";
import Action from "../../../logic/actions/Action";

export default class MessageBinarySerializer {

    constructor(messageRepository) {
        this.messageRegistry = messageRepository;
        this.messageBinaryDescriptor = Message.prototype[BinaryDescriptor.symbol];
        this.messageByteSize = this.messageBinaryDescriptor.getTotalByteSize(null);
    }

    serialize(message) {
        const actionBinaryDescriptor = message.action[BinaryDescriptor.symbol];
        if (!actionBinaryDescriptor) {
            throw new Error("Invalid message descriptor");
        }
        const actionByteSize = actionBinaryDescriptor.getTotalByteSize(message);

        const totalByteSize = this.messageByteSize + actionByteSize;
        const arrayBuffer = new ArrayBuffer(totalByteSize);
        const messageDataView = new DataView(arrayBuffer, 0, this.messageByteSize);
        const actionDataView = new DataView(arrayBuffer, this.messageByteSize, actionByteSize);

        this.messageBinaryDescriptor.encode(messageDataView, message);
        actionBinaryDescriptor.encode(actionDataView, message.action);

        return arrayBuffer;
    }

    deserialize(arrayBuffer) {
        if (arrayBuffer.byteLength < this.messageByteSize) {
            throw new Error("Invalid array buffer");
        }

        const message = new Message({});
        const messageDataView = new DataView(arrayBuffer, 0, this.messageByteSize);
        this.messageBinaryDescriptor.decode(messageDataView, message);

        if (!message.code) {
            throw new Error("Invalid action code");
        }

        const actionConstructor = this.messageRegistry.getConstructorByCode(message.code);
        const actionBinaryDescriptor = actionConstructor.prototype[BinaryDescriptor.symbol];

        if (!actionBinaryDescriptor) {
            throw new Error("Invalid action descriptor");
        }

        const action = new actionConstructor();
        const actionDataView = new DataView(arrayBuffer, this.messageByteSize);
        actionBinaryDescriptor.decode(actionDataView, action);

        message.action = action;

        return message;
    }
}
