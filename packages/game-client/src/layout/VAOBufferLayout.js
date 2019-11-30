import VAOAllocation from "./VAOAllocation";
import VAOAttributeAllocation from "./VAOAttributeAllocation";

const glBufferMapper = {
    "element_array": WebGLRenderingContext["ELEMENT_ARRAY_BUFFER"],
    "array": WebGLRenderingContext["ARRAY_BUFFER"],
};

export default class VAOBufferLayout {

    constructor({type, schema, attributes}) {
        if (!Array.isArray(attributes)) {
            throw new Error("Property attributes must be array");
        }
        this.glBufferType = glBufferMapper[type];
        if (this.glBufferType === undefined) {
            throw new Error("Invalid buffer type");
        }
        this.schema = schema;
        this.attributes = attributes;
    }

    createVAOAllocation(vaoLayout) {
        const verticesCount = vaoLayout.vertices;

        const blocks = this.parseSchema();
        const vaoAllocation = new VAOAllocation({vaoLayout});

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
        for (let {attributeLayout} of block) {
            if (blockStride % attributeLayout.type.glTypeStride !== 0) {
                throw new Error("Invalid stride or offset data pack");
            }
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
