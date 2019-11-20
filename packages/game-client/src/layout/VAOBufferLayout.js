import Core from "robo24-core";
import VAOAllocation from "./VAOAllocation";
import VAOAttributeAllocation from "./VAOAttributeAllocation";

const glBufferMapper = {
    "element_array": Core.WebGLRenderingContext.ELEMENT_ARRAY_BUFFER,
    "array": Core.WebGLRenderingContext.ARRAY_BUFFER,
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

    createVAOAllocation(vaoLayout) {
        const verticesCount = vaoLayout.getVerticesCount();

        const blocks = this.parseSchema();
        const vaoAllocation = new VAOAllocation();

        let blockOffset = 0;
        for (let block of blocks) {
            let attributeOffset = 0;
            const blockStride = this.calculateBlockStride(block);
            for (let {attributeLayout} of block) {
                const vaoAttributeAllocation = new VAOAttributeAllocation({
                    vaoLayout,
                    attributeLayout,
                    stride: blockStride,
                    offset: blockOffset + attributeOffset,
                });
                vaoAllocation.add(vaoAttributeAllocation);
                attributeOffset += attributeLayout.type.getByteLength();
            }
            blockOffset += (blockStride * verticesCount);
        }

        return vaoAllocation;
    }

    calculateBlockStride(block) {
        let blockStride = 0;
        for (let {attributeLayout} of block) {
            blockStride += attributeLayout.type.getByteLength();
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

            const attributeLayout = this.attributes[attributeCounter];
            if (attributeLayout === undefined) {
                throw new Error("Invalid schema. Not enough attributes.");
            }

            blocks[blockCounter].push({char, attributeLayout});
            attributeCounter++;
        }

        if (this.attributes[attributeCounter] !== undefined) {
            throw new Error("Invalid schema. Too many attributes.");
        }

        return blocks;
    }
}
