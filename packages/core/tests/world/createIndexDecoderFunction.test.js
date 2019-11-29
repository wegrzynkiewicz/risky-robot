import assert from "assert";
import createIndexDecoderFunction from "../../src/world/createIndexDecoderFunction";

describe("createIndexDecoderFunction", function () {
    it(`should create valid function which can encode index using square size`, function () {
        const indexDecode = createIndexDecoderFunction({widthBitShift: 4, heightBitShift: 4});
        const {x, y, z} = indexDecode(273);
        assert.strictEqual(x, 1, "X is invalid");
        assert.strictEqual(y, 1, "Y is invalid");
        assert.strictEqual(z, 1, "Z is invalid");
    });

    it(`should create valid function which can encode index using different size`, function () {
        const indexDecode = createIndexDecoderFunction({widthBitShift: 6, heightBitShift: 4});
        const {x, y, z} = indexDecode(2178);
        assert.strictEqual(x, 2, "X is invalid");
        assert.strictEqual(y, 2, "Y is invalid");
        assert.strictEqual(z, 2, "Z is invalid");
    });
});
