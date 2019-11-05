import {assert} from "chai";
import messageSymbol from "../../../../lib/network/communication/messageSymbol";
import MessageBinarySerializer from "../../../../lib/network/communication/serialization/MessageBinarySerializer";

class ExampleMessage {
    constructor() {
        this.static = 0x00f4;
        this.vector = new Uint16Array([1, 2, 3]);
        this.matrix = new Float32Array([1.1, 2.3, 3.3, 4.4]);
    }
}

ExampleMessage.prototype[messageSymbol] = {
    code: 0x00e4,
    name: "example",
    type: "binary",
    descriptor: {
        properties: [
            {type: "u32", property: "static"},
            {type: "vec3<u16>", property: "vector"},
            {type: "mat2<f32>", property: "matrix"},
        ],
    }
};

describe("MessageBinarySerializer", function () {
    it(`should serialize example message`, function () {
        const message = new ExampleMessage();
        new MessageBinarySerializer(null);
    });
});

    it(`should serialize example message`, function () {
        const message = new ExampleMessage();
        new MessageBinarySerializer(null);
    });
