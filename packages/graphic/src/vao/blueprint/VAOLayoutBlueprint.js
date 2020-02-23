import Allocation from "../layout/Allocation";
import ArrayBufferBlueprint from "./ArrayBufferBlueprint";
import AttributeBatchBlueprint from "./AttributeBatchBlueprint";
import AttributeBlueprint from "./AttributeBlueprint";
import ElementBufferBlueprint from "./ElementBufferBlueprint";
import VAOLayout from "../layout/VAOLayout";

export default class VAOLayoutBlueprint {

    constructor({attributeBufferBlueprints, elementBufferBlueprint}) {
        this.attributeBufferBlueprints = [...attributeBufferBlueprints];
        this.elementBufferBlueprint = elementBufferBlueprint;
    }

    createLayout({openGLPrimitiveType, verticesCount, indicesCount}) {
        const allocation = new Allocation({openGLPrimitiveType, verticesCount, indicesCount});
        const layout = new VAOLayout({allocation});

        for (let attributeBufferBlueprint of this.attributeBufferBlueprints) {
            layout.createBufferLayout(attributeBufferBlueprint);
        }

        if (this.elementBufferBlueprint) {
            layout.createBufferLayout(this.elementBufferBlueprint);
        }

        return layout;
    }
}

VAOLayoutBlueprint.ArrayBuffer = ArrayBufferBlueprint;
VAOLayoutBlueprint.Attribute = AttributeBlueprint;
VAOLayoutBlueprint.AttributeBatch = AttributeBatchBlueprint;
VAOLayoutBlueprint.ElementArrayBuffer = ElementBufferBlueprint;
