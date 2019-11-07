import MessageSymbol from "../messageSymbol";
import MessageJSONSerializer from "./MessageJSONSerializer";
import MessageBinarySerializer from "./MessageBinarySerializer";

export default class MessageSerializer {

    /**
     * @param {MessageRepository} messageRepository
     */
    constructor(messageRepository) {
        this.types = Object.create(null);
        this.types["json"] = new MessageJSONSerializer(messageRepository);
        this.types["binary"] = new MessageBinarySerializer(messageRepository);
    }

    serialize(messageInstance) {
        const message = messageInstance[MessageSymbol];
        if (!message) {
            throw new Error("Invalid message instance");
        }
        const type = message['type'];
        const serializer = this.types[type];
        if (!serializer) {
            throw new Error("Invalid message type");
        }
        const serializedData = serializer.serialize(messageInstance);
        return serializedData;
    }

    deserialize(encodedData) {
        const type = typeof encodedData === "string" ? "json" : "binary";
        const message = this.types[type].deserialize(encodedData);
        return message;
    }
}
