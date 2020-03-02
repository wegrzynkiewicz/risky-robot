import assert from 'assert';
import createIndexEncoderFunction from '../../src/world/createIndexEncoderFunction';

describe('createIndexEncoderFunction', function () {
    it('should create valid function which can encode index using square size', function () {
        const indexEncode = createIndexEncoderFunction({widthBitShift: 4, heightBitShift: 4});
        assert.strictEqual(indexEncode(1, 1, 1), (1 << 8) + (1 << 4) + 1);
    });

    it('should create valid function which can encode index using different size ', function () {
        const indexEncode = createIndexEncoderFunction({widthBitShift: 6, heightBitShift: 4});
        assert.strictEqual(indexEncode(2, 2, 2), (2 << 10) + (2 << 6) + 2);
    });
});
