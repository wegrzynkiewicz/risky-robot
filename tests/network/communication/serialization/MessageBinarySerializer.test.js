import assert from "assert";
import Action from "../../../../lib/logic/actions/Action";
import MessageBinarySerializer from "../../../../lib/network/communication/serialization/MessageBinarySerializer";
import BinaryDescriptor from "../../../../lib/binary/BinaryDescriptor";
import Message from "../../../../lib/network/communication/Message";
import binaryDescriptorSymbol from "../../../../lib/binary/binaryDescriptorSymbol";

class ExampleAction {
    constructor() {
        this.static = 0x00f4;
        this.vector = new Uint16Array([1, 2, 3]);
        this.matrix = new Float32Array([1.1, 2.2, 3.3, 4.4]);
    }
}

Action.bind(ExampleAction, {
    code: 0x00e4,
    name: "example",
    type: "binary",
});

BinaryDescriptor.bind(ExampleAction, {
    properties: [
        {type: "u16", property: "static"},
        {type: "vec3<u16>", property: "vector"},
        {type: "mat2<f32>", property: "matrix"},
    ],
});

const action = new ExampleAction();
const actionRegistryMock = {
    getConstructorByCode: code => ExampleAction,
};
const serializer = new MessageBinarySerializer(actionRegistryMock);
const message = Message.createFromAction(action);
const messageByteSize = message[binaryDescriptorSymbol].getTotalByteSize(message);

describe("MessageBinarySerializer", function () {

    it("serialize example message", function () {
        const arrayBuffer = serializer.serialize(message);
        const messageDataView = new DataView(arrayBuffer, 0, messageByteSize);
        const actionDataView = new DataView(arrayBuffer, messageByteSize);

        assert.strictEqual(arrayBuffer.byteLength, messageByteSize + 24);
        assert.strictEqual(messageDataView.getUint16(0, true), 0x00e4);
        assert.strictEqual(messageDataView.getUint16(2, true), 0x0000);
        assert.strictEqual(actionDataView.getUint16(0, true), 0x00f4);
        assert.strictEqual(actionDataView.getUint16(2, true), 1);
        assert.strictEqual(actionDataView.getUint16(4, true), 2);
        assert.strictEqual(actionDataView.getUint16(6, true), 3);
        assert.strictEqual(actionDataView.getFloat32(8, true).toFixed(4), "1.1000");
        assert.strictEqual(actionDataView.getFloat32(12, true).toFixed(4), "2.2000");
        assert.strictEqual(actionDataView.getFloat32(16, true).toFixed(4), "3.3000");
        assert.strictEqual(actionDataView.getFloat32(20, true).toFixed(4), "4.4000");
    });

    it("deserialize example message", function () {
        const arrayBuffer = new ArrayBuffer(messageByteSize + 24);
        const messageDataView = new DataView(arrayBuffer, 0, messageByteSize);
        const actionDataView = new DataView(arrayBuffer, messageByteSize);
        messageDataView.setUint16(0, 0x00e4, true);
        messageDataView.setUint16(2, 0x1111, true);
        actionDataView.setUint16(0, 0x00a4, true);
        actionDataView.setUint16(2, 4, true);
        actionDataView.setUint16(4, 5, true);
        actionDataView.setUint16(6, 6, true);
        actionDataView.setFloat32(8, 5.5, true);
        actionDataView.setFloat32(12, 6.6, true);
        actionDataView.setFloat32(16, 7.7, true);
        actionDataView.setFloat32(20, 8.8, true);

        const message = serializer.deserialize(arrayBuffer);

        assert(message instanceof Message);
        assert.strictEqual(message.code, 0x00e4);
        assert.strictEqual(message.id, 0x1111);
        assert(message.action instanceof ExampleAction);
        assert.strictEqual(message.action.static, 0x00a4);
        assert.strictEqual(message.action.vector[0], 4);
        assert.strictEqual(message.action.vector[1], 5);
        assert.strictEqual(message.action.vector[2], 6);
        assert.strictEqual(message.action.matrix[0].toFixed(4), "5.5000");
        assert.strictEqual(message.action.matrix[1].toFixed(4), "6.6000");
        assert.strictEqual(message.action.matrix[2].toFixed(4), "7.7000");
        assert.strictEqual(message.action.matrix[3].toFixed(4), "8.8000");
    });
});
