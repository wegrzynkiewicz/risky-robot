import messageSymbol from "../messageSymbol";
import binaryDescriptorSymbol from "../../../binary/binaryDescriptorSymbol";

const headerByteSize = 2;

export default class MessageBinarySerializer {

    constructor(messageRepository) {
        this.messageRegistry = messageRepository;
    }

    serialize(message) {
        const messageInfo = message[messageSymbol];
        const binaryDescriptor = message[binaryDescriptorSymbol];

        const messageByteSize = binaryDescriptor.getTotalByteSize(message);
        const totalByteSize = messageByteSize + headerByteSize;

        const arrayBuffer = new ArrayBuffer(totalByteSize);
        const serializerDataView = new DataView(arrayBuffer, 0, headerByteSize);
        const descriptorDataView = new DataView(arrayBuffer, headerByteSize, messageByteSize);

        serializerDataView.setUint16(0, messageInfo.code);
        binaryDescriptor.encode(descriptorDataView, message);

        return arrayBuffer;
    }

    deserialize(data) {

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
