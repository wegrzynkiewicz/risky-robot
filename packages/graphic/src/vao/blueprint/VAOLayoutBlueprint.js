import Allocation from "../layout/Allocation";
import ArrayBufferBlueprint from "./ArrayBufferBlueprint";
import AttributeBatchBlueprint from "./AttributeBatchBlueprint";
import AttributeBlueprint from "./AttributeBlueprint";
import ElementBufferBlueprint from "./ElementBufferBlueprint";
import VAOLayout from "../layout/VAOLayout";

export default class VAOLayoutBlueprint {

    constructor({buffers}) {
        if (!Array.isArray(buffers)) {
            throw new Error("Property buffers must be array");
        }
        this.bufferBlueprints = [...buffers];
    }

    createLayout({openGLPrimitiveType, verticesCount}) {
        const allocation = new Allocation({openGLPrimitiveType, verticesCount});
        const layout = new VAOLayout({allocation});

        for (let bufferBlueprint of this.bufferBlueprints) {
            const bufferLayout = bufferBlueprint.createBufferLayout({allocation});
            layout.bufferLayoutMap.set(bufferLayout.name, bufferLayout);
        }

        return layout;
    }
}

VAOLayoutBlueprint.ArrayBuffer = ArrayBufferBlueprint;
VAOLayoutBlueprint.Attribute = AttributeBlueprint;
VAOLayoutBlueprint.AttributeBatch = AttributeBatchBlueprint;
VAOLayoutBlueprint.ElementArrayBuffer = ElementBufferBlueprint;
