import BinaryBuffer from "../../../binary/BinaryBuffer";
import BinaryAccess from "../../../binary/BinaryAccess";
import MessageSymbol from "../messageSymbol";
import BinaryWriter from "../../../binary/BinaryWriter";

export default class MessageBinarySerializer {

    constructor(messageRepository) {
        this.messageRegistry = messageRepository;
    }

    serialize(message) {
        const messageInfo = message[MessageSymbol];
        /*const encode = messageInfo.encode;

        if (encode === undefined) {
            throw new Error("Encode function not exists");
        }*/

        const arrayBuffer = new ArrayBuffer(30);
        const dataView = new DataView(arrayBuffer);

        dataView.setUint16(0, messageInfo.code);

        const buffer = arrayBuffer;
        return buffer;
    }

    deserialize(data) {
        const buffer = BinaryBuffer.from(data);
        const binaryAccess = new BinaryAccess(buffer);

        const code = binaryAccess.readUInt16BE();

        if (!code) {
            throw new Error("Cannot deserialize");
        }

        const constructor = this.messageRegistry.getConstructorByCode(code);
        const {decode} = constructor.prototype[MessageSymbol];
/*
        if (decode === undefined) {
            throw new Error("Decode function not exists");
        }

        const message = decode.call(constructor, buffer);

        if (!message) {
            throw new Error("Invalid decoded message")
        }*/

const message = new constructor(buffer);

        return message;
    }
}
