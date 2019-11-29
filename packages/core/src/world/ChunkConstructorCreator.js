import WebGLRenderingContext from "../graphic/WebGLRenderingContext";
import createIndexEncoderFunction from "./createIndexEncoderFunction";
import createIndexDecoderFunction from "./createIndexDecoderFunction";
import Chunk from "./Chunk";

const createChunkConstructor = function () {
    const constructor = function () {
        Chunk.prototype.constructor.call(this);
    };

    constructor.prototype = Object.create(Chunk.prototype);
    constructor.prototype.constructor = constructor;

    return constructor;
};

export default class ChunkConstructorCreator {

    create({widthBitShift, heightBitShift, depthBitShift}) {
        const constructor = createChunkConstructor();
        const {prototype} = constructor;

        Object.defineProperties(prototype, {
            'widthBitShift': {value: widthBitShift},
            'heightBitShift': {value: heightBitShift},
            'depthBitShift': {value: depthBitShift},
            'width': {value: 1 << widthBitShift},
            'height': {value: 1 << heightBitShift},
            'depth': {value: 1 << depthBitShift},
            'elements': {value: 1 << widthBitShift << heightBitShift << depthBitShift},
            'encodeIndex': {value: createIndexEncoderFunction({widthBitShift, heightBitShift})},
            'decodeIndex': {value: createIndexDecoderFunction({widthBitShift, heightBitShift})},
        });
    }
}
