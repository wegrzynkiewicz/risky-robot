import VAOBufferAllocation from "./VAOBufferAllocation";
import VAOAttributeAllocation from "./VAOAttributeAllocation";

const glBufferMapper = {
    "element_array": WebGLRenderingContext["ELEMENT_ARRAY_BUFFER"],
    "array": WebGLRenderingContext["ARRAY_BUFFER"],
};

export default class VAOBufferLayout {

    constructor({name, type, schema, attributes}) {

        if (!Array.isArray(attributes)) {
            throw new Error("Property attributes must be array");
        }

        this.glBufferType = glBufferMapper[type];
        if (this.glBufferType === undefined) {
            throw new Error("Invalid buffer type");
        }

        this.name = name;
        this.schema = schema;
        this.attributes = attributes;
    }

    createVAOBufferAllocation(vaoAllocation) {

        const vaoBufferAllocation = new VAOBufferAllocation({
            vaoAllocation,
            vaoBufferLayout: this,
        });

        const blocks = this.parseSchema();

        let blockOffset = 0;
        for (let block of blocks) {
            let attributeOffset = 0;
            const blockStride = this.calculateBlockStride(block);
            for (let {vaoAttributeLayout} of block) {
                const vaoAttributeAllocation = new VAOAttributeAllocation({
                    vaoAllocation,
                    vaoAttributeLayout,
                    stride: blockStride,
                    offset: blockOffset + attributeOffset,
                });
                vaoBufferAllocation.addAttributeAllocation(vaoAttributeAllocation);
                attributeOffset += vaoAttributeLayout.type.getByteLength();
            }
            blockOffset += (blockStride * vaoBufferAllocation.vertices);
        }

        return vaoBufferAllocation;
    }

    calculateBlockStride(block) {
        let blockStride = 0;
        for (let {vaoAttributeLayout} of block) {
            blockStride += vaoAttributeLayout.type.getByteLength();
        }
        for (let {vaoAttributeLayout} of block) {
            if (blockStride % vaoAttributeLayout.type.glTypeStride !== 0) {
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

            const vaoAttributeLayout = this.attributes[attributeCounter];
            if (vaoAttributeLayout === undefined) {
                throw new Error("Invalid schema. Not enough attributes.");
            }

            blocks[blockCounter].push({char, vaoAttributeLayout});
            attributeCounter++;
        }

        if (this.attributes[attributeCounter] !== undefined) {
            throw new Error("Invalid schema. Too many attributes.");
        }

        return blocks;
    }
}
