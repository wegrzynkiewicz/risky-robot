import assert from "assert";
import Message from "../../../../lib/network/communication/Message";
import BinaryDescriptor from "../../../../lib/binary/BinaryDescriptor";
import MessageBinarySerializer from "../../../../lib/network/communication/serialization/MessageBinarySerializer";

class ExampleMessage {
    constructor() {
        this.static = 0x00f4;
        this.vector = new Uint16Array([1, 2, 3]);
        this.matrix = new Float32Array([1.1, 2.2, 3.3, 4.4]);
    }
}

Message.bind(ExampleMessage, {
    code: 0x00e4,
    name: "example",
    type: "binary",
});

BinaryDescriptor.bind(ExampleMessage, {
    properties: [
        {type: "u16", property: "static"},
        {type: "vec3<u16>", property: "vector"},
        {type: "mat2<f32>", property: "matrix"},
    ],
});

const message = new ExampleMessage();
const messageRegistryMock = {
    getConstructorByCode: code => ExampleMessage,
};
const serializer = new MessageBinarySerializer(messageRegistryMock);

describe("MessageBinarySerializer", function () {
    it("serialize example message", function () {
        const arrayBuffer = serializer.serialize(message);
        const dataView = new DataView(arrayBuffer);

        assert.strictEqual(arrayBuffer.byteLength, 26);
        assert.strictEqual(dataView.getUint16(0, true), 0x00e4);
        assert.strictEqual(dataView.getUint16(2, true), 0x00f4);
        assert.strictEqual(dataView.getUint16(4, true), 1);
        assert.strictEqual(dataView.getUint16(6, true), 2);
        assert.strictEqual(dataView.getUint16(8, true), 3);
        assert.equal(dataView.getFloat32(10, true).toFixed(4), "1.1000");
        assert.equal(dataView.getFloat32(14, true).toFixed(4), "2.2000");
        assert.equal(dataView.getFloat32(18, true).toFixed(4), "3.3000");
        assert.equal(dataView.getFloat32(22, true).toFixed(4), "4.4000");
    });

    it("deserialize example message", function () {
        const arrayBuffer = new ArrayBuffer(26);
        const dataView = new DataView(arrayBuffer);
        dataView.setUint16(0, 0x00e4, true);
        dataView.setUint16(2, 0x00c4, true);
        dataView.setUint16(4, 4, true);
        dataView.setUint16(6, 5, true);
        dataView.setUint16(8, 6, true);
        dataView.setFloat32(10, 5.5, true);
        dataView.setFloat32(14, 6.6, true);
        dataView.setFloat32(18, 7.7, true);
        dataView.setFloat32(22, 8.8, true);

        const message = serializer.deserialize(arrayBuffer);

        assert(message instanceof ExampleMessage);
        assert.strictEqual(message.static, 0x00c4);
        assert.strictEqual(message.vector[0], 4);
        assert.strictEqual(message.vector[1], 5);
        assert.strictEqual(message.vector[2], 6);
        assert.strictEqual(message.matrix[0].toFixed(4), "5.5000");
        assert.strictEqual(message.matrix[1].toFixed(4), "6.6000");
        assert.strictEqual(message.matrix[2].toFixed(4), "7.7000");
        assert.strictEqual(message.matrix[3].toFixed(4), "8.8000");
    });
});
