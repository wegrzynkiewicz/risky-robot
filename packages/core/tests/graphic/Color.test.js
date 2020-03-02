import assert from 'assert';
import Color from '../../src/graphic/Color';

describe('Color', function () {

    it('should created successful', function () {
        const color = new Color(0, 0, 0, 0);
    });

    it('should created from int index', function () {
        const color = Color.fromIndex(0x123456);
        assert.strictEqual(color.toHex(), '#123456');
    });

    it('should created from hex', function () {
        const color = Color.fromHex('#123456');
        assert.strictEqual(color.toHex(), '#123456');
    });

    it('should created from random', function () {
        const color = Color.fromRandom();
        assert(color.r < 1.0);
        assert(color.r > 0.0);
        assert(color.g < 1.0);
        assert(color.g > 0.0);
        assert(color.b < 1.0);
        assert(color.b > 0.0);
    });
});
