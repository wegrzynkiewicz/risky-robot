import Allocation from "../allocation/Allocation";
import ArrayBufferLayout from "./ArrayBufferLayout";
import AttributeBatchLayout from "./AttributeBatchLayout";
import AttributeLayout from "./AttributeLayout";
import ElementBufferLayout from "./ElementBufferLayout";

export default class Layout {

    constructor({buffers}) {
        if (!Array.isArray(buffers)) {
            throw new Error("Property buffers must be array");
        }
        this.bufferLayouts = [...buffers];
    }

    createAllocation({primitive, elementsCount}) {
        const allocation = new Allocation({primitive, elementsCount});

        for (let bufferLayout of this.bufferLayouts) {
            const bufferAllocation = bufferLayout.createBufferAllocation({allocation});
        }

        return allocation;
    }
}

Layout.ArrayBuffer = ArrayBufferLayout;
Layout.Attribute = AttributeLayout;
Layout.AttributeBatch = AttributeBatchLayout;
Layout.ElementArrayBuffer = ElementBufferLayout;
