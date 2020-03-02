import * as assert from 'assert';
import Transformation from '../../src/scene/Transformation';
import {Matrix4} from '../../src/math';

describe('Transformation', function () {
    it('should create identity transformation', function(){
        const transformation = new Transformation();
        assert.ok(Matrix4.equals(transformation.localMatrix, Matrix4.create()));
    });
});
