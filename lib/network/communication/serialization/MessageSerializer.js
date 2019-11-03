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

    serialize(message) {
        const messageInfo = message[MessageSymbol];
        if (messageInfo === undefined) {
            throw new Error("Cannot serialize");
        }
        const type = messageInfo['type'];
        const serializer = this.types[type];
        const serializedData = serializer.serialize(message);
        return serializedData;
    }

    deserialize(encodedData) {
        const type = typeof encodedData === "string" ? "json" : "binary";
        const message = this.types[type].deserialize(encodedData);
        return message;
    }
}
