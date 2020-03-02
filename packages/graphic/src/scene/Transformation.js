import {Matrix4} from '../math';

const bpe = Float32Array.BYTES_PER_ELEMENT;
const arrayBufferLength = (3 + 4 + 3 + 16 + 16) * bpe;

export default class Transformation {

    constructor() {
        this.arrayBuffer = new ArrayBuffer(arrayBufferLength);
        this.translation = new Float32Array(this.arrayBuffer, 0, 3);
        this.rotation = new Float32Array(this.arrayBuffer, 3 * bpe, 4);
        this.scale = new Float32Array(this.arrayBuffer, 7 * bpe, 3);
        this.localMatrix = new Float32Array(this.arrayBuffer, 10 * bpe, 16);
        this.modelMatrix = new Float32Array(this.arrayBuffer, 26 * bpe, 16);
        this.identity();
    }

    identity() {
        this.translation[0] = 0.0;
        this.translation[1] = 0.0;
        this.translation[2] = 0.0;
        this.rotation[0] = 0.0;
        this.rotation[1] = 0.0;
        this.rotation[2] = 0.0;
        this.rotation[3] = 1.0;
        this.scale[0] = 1.0;
        this.scale[1] = 1.0;
        this.scale[2] = 1.0;
        Matrix4.identity(this.localMatrix);
        Matrix4.identity(this.modelMatrix);
    }

    decompose(matrix) {
        Matrix4.getTranslation(this.translation, matrix);
        Matrix4.getRotation(this.rotation, matrix);
        Matrix4.getScaling(this.scale, matrix);
        Matrix4.copy(this.localMatrix, matrix);
    }

    updateLocalMatrix() {
        Matrix4.fromRotationTranslationScale(
            this.localMatrix,
            this.rotation,
            this.translation,
            this.scale,
        );
    }

    updateModelMatrix(parentModelMatrix) {
        Matrix4.multiply(this.modelMatrix, parentModelMatrix, this.localMatrix);
    }
}
