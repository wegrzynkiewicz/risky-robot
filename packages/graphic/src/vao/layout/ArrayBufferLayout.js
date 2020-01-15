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
        let batchOffset = 0;
        const bufferAllocation = new ArrayBufferAllocation();
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
}
