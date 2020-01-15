import Allocation from "../allocation/Allocation";
import ArrayBufferLayout from "./ArrayBufferLayout";
import AttributeLayout from "./AttributeLayout";
import ElementBufferLayout from "./ElementBufferLayout";

export default class Layout {

    constructor({buffers}) {
        if (!Array.isArray(buffers)) {
            throw new Error("Property buffers must be array");
        }
        this.bufferLayouts = buffers;
    }

    createAllocation({primitive, elements}) {
        const vaoAllocation = new Allocation({primitive, elements});

        for (let bufferLayout of this.bufferLayouts) {
            const vaoBufferAllocation = bufferLayout.createBufferAllocation(vaoAllocation);
            vaoAllocation.addVAOBufferAllocation(vaoBufferAllocation);
        }

        return vaoAllocation;
    }
}

Layout.ArrayBuffer = ArrayBufferLayout;
Layout.Attribute = AttributeLayout;
Layout.ElementArrayBuffer = ElementBufferLayout;
