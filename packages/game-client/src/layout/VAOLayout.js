import VAOAttributeLayout from "./VAOAttributeLayout";
import VAOBufferLayout from "./VAOBufferLayout";

const primitivesType = {
    "triangle": {
        glType: WebGLRenderingContext["TRIANGLES"],
        glTypeName: "TRIANGLES",
        calculateVerticesCount: elements => elements * 3,
    },
};

export default class VAOLayout {

    constructor({elements, primitive}) {
        this.elements = elements;
        this.primitive = primitive;
        this.vertices = primitivesType[this.primitive].calculateVerticesCount(this.elements);
        this.glDrawType = primitivesType[this.primitive].glType;
        this.glDrawTypeName = primitivesType[this.primitive].glTypeName;
    }
}

VAOLayout.Buffer = VAOBufferLayout;
VAOLayout.Attribute = VAOAttributeLayout;
