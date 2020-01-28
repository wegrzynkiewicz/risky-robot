import ElementBufferLayout from "../layout/ElementBufferLayout";

export default class ElementBufferBlueprint {

    constructor({name}) {
        this.name = name;
    }

    createBufferLayout({allocation}) {
        const bufferLayout = new ElementBufferLayout({
            name: this.name,
            byteLength: this.calculateTotalByteLength(allocation)
        });

        return bufferLayout;
    }

    calculateTotalByteLength(allocation) {
        // TODO: refactor
        return allocation.verticesCount * 3;
    }
}
