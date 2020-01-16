import Allocation from "../layout/Allocation";
import ArrayBufferBlueprint from "./ArrayBufferBlueprint";
import AttributeBatchBlueprint from "./AttributeBatchBlueprint";
import AttributeBlueprint from "./AttributeBlueprint";
import ElementBufferBlueprint from "./ElementBufferBlueprint";
import Layout from "../layout/Layout";

export default class VAOBlueprint {

    constructor({buffers}) {
        if (!Array.isArray(buffers)) {
            throw new Error("Property buffers must be array");
        }
        this.bufferBlueprints = [...buffers];
    }

    createLayout({primitive, elementsCount}) {
        const allocation = new Allocation({primitive, elementsCount});
        const layout = new Layout({primitive, elementsCount});

        for (let bufferBlueprint of this.bufferBlueprints) {
            const bufferLayout = bufferBlueprint.createBufferLayout({allocation});
        }

        return layout;
    }
}

VAOBlueprint.ArrayBuffer = ArrayBufferBlueprint;
VAOBlueprint.Attribute = AttributeBlueprint;
VAOBlueprint.AttributeBatch = AttributeBatchBlueprint;
VAOBlueprint.ElementArrayBuffer = ElementBufferBlueprint;
