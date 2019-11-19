import VAOAllocation from "./VAOAllocation";
import webGLRenderingContext from "../graphic/webGLRenderingContext";

const glBufferMapper = {
    "element_array": webGLRenderingContext.ELEMENT_ARRAY_BUFFER,
    "array": webGLRenderingContext.ARRAY_BUFFER,
};

export default class VAOBufferLayout {

    constructor({type, schema, attributes}) {
        if (!Array.isArray(attributes)) {
            throw new Error("Property attributes must be array");
        }

        this.type = glBufferMapper[type];
        this.schema = schema;
        this.attributes = attributes;
    }

    createVAOAllocation(verticesCount) {
        const blocks = this.parseSchema();
        const vaoAllocation = new VAOAllocation({
            vertices: verticesCount,
        });

        let blockOffset = 0;
        for (let block of blocks) {
            let attributeOffset = 0;
            const blockStride = this.calculateBlockStride(block);
            for (let {attribute} of block) {
                vaoAllocation.add({
                    name: attribute.name,
                    stride: blockStride,
                    offset: blockOffset + attributeOffset,
                });
                attributeOffset += attribute.type.byteLength;
            }
            blockOffset += (blockStride * verticesCount);
        }

        return vaoAllocation;
    }

    calculateBlockStride(block) {
        let blockStride = 0;
        for (let {attribute} of block) {
            blockStride += attribute.type.byteLength;
        }
        return blockStride;
    }

    parseSchema() {
        const chars = this.schema.split("");
        const blocks = [[]];
        let blockCounter = 0;
        let attributeCounter = 0;

        for (let char of chars) {
            if (char === "/") {
                blockCounter++;
                blocks[blockCounter] = [];
                continue;
            }

            const attribute = this.attributes[attributeCounter];
            if (attribute === undefined) {
                throw new Error("Invalid schema. Not enough attributes.");
            }

            blocks[blockCounter].push({char, attribute});
            attributeCounter++;
        }

        if (this.attributes[attributeCounter] !== undefined) {
            throw new Error("Invalid schema. Too many attributes.");
        }

        return blocks;
    }
}
