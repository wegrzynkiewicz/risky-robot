import Allocation from "../layout/Allocation";
import ArrayBufferBlueprint from "./ArrayBufferBlueprint";
import AttributeBatchBlueprint from "./AttributeBatchBlueprint";
import AttributeBlueprint from "./AttributeBlueprint";
import ElementBufferBlueprint from "./ElementBufferBlueprint";
import VertexLayout from "../layout/VertexLayout";

export default class VertexLayoutBlueprint {

    constructor({buffers}) {
        if (!Array.isArray(buffers)) {
            throw new Error("Property buffers must be array");
        }
        this.bufferBlueprints = [...buffers];
    }

    createLayout({primitive, elementsCount}) {
        const allocation = new Allocation({primitive, elementsCount});
        const layout = new VertexLayout({primitive, elementsCount});

        for (let bufferBlueprint of this.bufferBlueprints) {
            const bufferLayout = bufferBlueprint.createBufferLayout({allocation});
        }

        return layout;
    }
}

VertexLayoutBlueprint.ArrayBuffer = ArrayBufferBlueprint;
VertexLayoutBlueprint.Attribute = AttributeBlueprint;
VertexLayoutBlueprint.AttributeBatch = AttributeBatchBlueprint;
VertexLayoutBlueprint.ElementArrayBuffer = ElementBufferBlueprint;
