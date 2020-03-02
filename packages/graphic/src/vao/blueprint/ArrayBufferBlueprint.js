import ArrayBufferLayout from '../layout/ArrayBufferLayout';

export default class ArrayBufferBlueprint {

    constructor({batchBlueprints, name}) {
        this.batchBlueprints = [...batchBlueprints];
        this.name = name;
    }

    createBufferLayout({allocation}) {
        const bufferLayout = new ArrayBufferLayout({
            name: this.name,
            byteLength: this.calculateTotalByteLength(allocation)
        });

        let batchOffset = 0;
        for (let batchBlueprint of this.batchBlueprints) {
            const batchAllocation = batchBlueprint.createAttributeBatchLayout({
                allocation,
                batchOffset
            });
            const batchByteLength = batchBlueprint.calculateTotalByteLength(allocation);
            batchOffset += batchByteLength;
            bufferLayout.attributeBatchLayoutSet.add(batchAllocation);
        }

        return bufferLayout;
    }

    calculateTotalByteLength(allocation) {
        let totalByteLength = 0;
        for (let batchBlueprint of this.batchBlueprints) {
            const batchByteLength = batchBlueprint.calculateTotalByteLength(allocation);
            totalByteLength += batchByteLength
        }
        return totalByteLength;
    }
}
