import assert from 'assert';
import BinaryDescriptor from '../../src/binary/BinaryDescriptor';

describe('BinaryDescriptor', function () {
    it('should bind binary encoding data to function prototype', function () {
        class Example {
        }

        const binaryDescriptor = new BinaryDescriptor({
            properties: [
                {type: 'u32', property: 'static'},
                {type: 'vec3<u16>', property: 'vector'},
                {type: 'mat4<f32>', property: 'matrix'},
            ]
        });

        const example = new Example();

        assert.strictEqual(binaryDescriptor.getTotalByteSize(example), 74);
    });
});
