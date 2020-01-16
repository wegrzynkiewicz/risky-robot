import ArrayBufferAllocation from "../allocation/ArrayBufferAllocation";

export default class ArrayBufferLayout {

    constructor({name, schema, batches}) {
        if (!Array.isArray(batches)) {
            throw new Error("Property batches must be array");
        }
        this.name = name;
        this.batchLayouts = batches;
        this.glBufferType = WebGLRenderingContext["ARRAY_BUFFER"];
        this.glBufferTypeName = "ARRAY_BUFFER";
    }

    createBufferAllocation({allocation}) {
        const bufferAllocation = new ArrayBufferAllocation({
            byteLength: this.calculateTotalByteLength(allocation)
        });

        let batchOffset = 0;
        for (let batchLayout of this.batchLayouts) {
            const batchAllocation = batchLayout.createAttributeBatchAllocation({
                allocation,
                batchOffset
            });
            batchOffset += batchLayout.calculateTotalByteLength(allocation);
            bufferAllocation.attributeBatchAllocationSet.add(batchAllocation);
        }
        allocation.bufferAllocationMap.set(this.name, bufferAllocation);

        return bufferAllocation;
    }

    calculateTotalByteLength(allocation) {
        let totalByteLength = 0;
        for (let batchLayout of this.batchLayouts) {
            totalByteLength += batchLayout.calculateTotalByteLength(allocation);
        }
        return totalByteLength;
    }
}
