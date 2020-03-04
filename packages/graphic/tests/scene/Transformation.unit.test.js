import * as assert from 'assert';
import {Matrix4} from '../../src/math';
import Transformation from '../../src/scene/Transformation';

describe('Transformation', () => {
    it('should create identity transformation', () => {
        const transformation = new Transformation();
        assert.ok(Matrix4.equals(transformation.localMatrix, Matrix4.create()));
    });
});
