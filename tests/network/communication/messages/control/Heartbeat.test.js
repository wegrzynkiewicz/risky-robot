import assert from "assert";
import Message from "../../../../../lib/network/communication/Message";
import MessageBinarySerializer from "../../../../../lib/network/communication/serialization/MessageBinarySerializer";
import Heartbeat from "../../../../../lib/network/communication/messages/control/Heartbeat";

const messageRegistryMock = {
    getConstructorByCode: code => Heartbeat,
};
const serializer = new MessageBinarySerializer(messageRegistryMock);

describe("Heartbeat", function () {
    it("serialize", function () {
        const heartbeat = new Heartbeat();
        const arrayBuffer = serializer.serialize(heartbeat);

        assert.strictEqual(arrayBuffer.byteLength, 2);
    });

    it("deserialize", function () {
        const arrayBuffer = new ArrayBuffer(2);
        const dataView = new DataView(arrayBuffer);
        dataView.setUint16(0, 0x0001, true);

        const heartbeat = serializer.deserialize(arrayBuffer);

        assert(heartbeat instanceof Heartbeat);
    });
});
