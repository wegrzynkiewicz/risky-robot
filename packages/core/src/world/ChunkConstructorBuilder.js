import createIndexEncoderFunction from "./createIndexEncoderFunction";
import createIndexDecoderFunction from "./createIndexDecoderFunction";
import Chunk from "./Chunk";

const createChunkConstructor = new Function ("Chunk", "return class extends Chunk {};");

export default class ChunkConstructorBuilder {

    build({widthBitShift, heightBitShift, depthBitShift}) {
        const constructor = createChunkConstructor(Chunk);
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

        return constructor;
    }
}
