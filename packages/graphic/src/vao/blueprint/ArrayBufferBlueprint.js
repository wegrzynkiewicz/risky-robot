import ArrayBufferLayout from "../layout/ArrayBufferLayout";

export default class ArrayBufferBlueprint {

    constructor({name, schema, batches}) {
        if (!Array.isArray(batches)) {
            throw new Error("Property batches must be array");
        }
        this.name = name;
        this.batchBlueprints = batches;
        this.glBufferType = WebGLRenderingContext["ARRAY_BUFFER"];
        this.glBufferTypeName = "ARRAY_BUFFER";
    }

    createBufferLayout({allocation}) {
        const bufferLayout = new ArrayBufferLayout({
            byteLength: this.calculateTotalByteLength(allocation)
        });

        let batchOffset = 0;
        for (let batchBlueprint of this.batchBlueprints) {
            const batchAllocation = batchBlueprint.createAttributeBatchLayout({
                allocation,
                batchOffset
            });
            batchOffset += batchBlueprint.calculateTotalByteLength(allocation);
            bufferLayout.attributeBatchLayoutSet.add(batchAllocation);
        }

        return bufferLayout;
    }

    calculateTotalByteLength(allocation) {
        let totalByteLength = 0;
        for (let batchBlueprint of this.batchBlueprints) {
            totalByteLength += batchBlueprint.calculateTotalByteLength(allocation);
        }
        return totalByteLength;
    }
}
