import actionSymbol from "../../../logic/actions/actionSymbol";
import binaryDescriptorSymbol from "../../../binary/binaryDescriptorSymbol";

const headerByteSize = 2;

export default class MessageBinarySerializer {

    constructor(messageRepository) {
        this.messageRegistry = messageRepository;
    }

    serialize(message) {
        const binaryDescriptor = message[binaryDescriptorSymbol];

        if (!binaryDescriptor) {
            throw new Error("Invalid message descriptor");
        }

        const messageByteSize = binaryDescriptor.getTotalByteSize(message);
        const totalByteSize = messageByteSize + headerByteSize;

        const arrayBuffer = new ArrayBuffer(totalByteSize);
        const serializerDataView = new DataView(arrayBuffer, 0, headerByteSize);
        const descriptorDataView = new DataView(arrayBuffer, headerByteSize, messageByteSize);

        serializerDataView.setUint16(0, messageInfo.code, true);
        binaryDescriptor.encode(descriptorDataView, message);

        return arrayBuffer;
    }

    deserialize(arrayBuffer) {
        const serializerDataView = new DataView(arrayBuffer, 0, headerByteSize);
        const descriptorDataView = new DataView(arrayBuffer, headerByteSize);
        const messageCode = serializerDataView.getUint16(0, true);

        if (!messageCode) {
            throw new Error("Invalid message code");
        }

        const messageConstructor = this.messageRegistry.getConstructorByCode(messageCode);
        const binaryDescriptor = messageConstructor.prototype[binaryDescriptorSymbol];

        if (!binaryDescriptor) {
            throw new Error("Invalid message descriptor");
        }

        const message = new messageConstructor();
        binaryDescriptor.decode(descriptorDataView, message);

        return message;
    }
}
