import AttributeBatchLayout from "./AttributeBatchLayout";

export default class ArrayBufferLayout {

    constructor({name, schema, attributes}) {
        if (!Array.isArray(attributes)) {
            throw new Error("Property attributes must be array");
        }
        this.name = name;
        this.schema = schema;
        this.attributeLayouts = attributes;
        this.glBufferType = WebGLRenderingContext["ARRAY_BUFFER"];
        this.glBufferTypeName = "ARRAY_BUFFER";
    }

    createBufferAllocation(allocation) {
        const bufferAllocation = new BufferAllocation();
        const batches = this.parseSchema();

        let blockOffset = 0;
        for (let batch of batches) {
            let attributeOffset = 0;
            for (let attributeAllocation of attributeAllocations) {
                bufferAllocation.addAttributeAllocation(attributeAllocation);
            }
            blockOffset += batch.calculateTotalByteLength(allocation);
        }

        return bufferAllocation;
    }

    parseSchema() {
        const batches = [];
        const blocks = this.schema.split("/");
        for (let block of blocks) {
            const chars = block.split("");
            const attributeBatch = new AttributeBatchLayout();
            for (let char of chars) {
                const attributeIndex = char.charCodeAt(0) - 97;
                const attributeLayout = this.attributeLayouts[attributeIndex];
                if (attributeLayout === undefined) {
                    throw new Error(`Not found attribute layout using char (${char}).`);
                }
                attributeBatch.addAttributeLayout(attributeLayout);
            }
            batches.push(attributeBatch);
        }
        return batches;
    }
}
