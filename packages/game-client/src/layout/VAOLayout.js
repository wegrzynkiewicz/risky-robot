import Core from "robo24-core";
import VAOAttributeLayout from "./VAOAttributeLayout";
import VAOBufferLayout from "./VAOBufferLayout";

const primitivesType = {
    "triangle": {
        glType: Core.WebGLRenderingContext["TRIANGLES"],
        getVerticesCount: elements => elements * 3,
    },
};

export default class VAOLayout {

    constructor({elements, primitive, buffers}) {
        this.elements = elements;
        this.primitive = primitive;
        this.glDrawType = primitivesType[this.primitive].glType;
        this.buffers = buffers;
    }

    getElementsCount() {
        return this.elements;
    }

    getVerticesCount() {
        return primitivesType[this.primitive].getVerticesCount(this.elements);
    }
}

VAOLayout.Buffer = VAOBufferLayout;
VAOLayout.Attribute = VAOAttributeLayout;
