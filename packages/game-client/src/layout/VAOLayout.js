import VAOAllocation from "./VAOAllocation";
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

    constructor({primitive, buffers}) {

        if (!Array.isArray(buffers)) {
            throw new Error("Property buffers must be array");
        }

        if (primitivesType[primitive] === undefined) {
            throw new Error("Invalid VAO allocation primitive type.");
        }

        this.bufferLayouts = buffers;
        this.primitive = primitive;
    }

    createVAOAllocation(elements) {
        const type = primitivesType[this.primitive];
        const vaoAllocation = new VAOAllocation({
            elements,
            vaoLayout: this,
            vertices: type.calculateVerticesCount(elements),
            glDrawType: type.glType,
            glDrawTypeName: type.glTypeName,
        });

        for (let bufferLayout of this.bufferLayouts) {
            const vaoBufferAllocation = bufferLayout.createVAOBufferAllocation(vaoAllocation);
            vaoAllocation.addVAOBufferAllocation(vaoBufferAllocation);
        }

        return vaoAllocation;
    }
}

VAOLayout.Buffer = VAOBufferLayout;
VAOLayout.Attribute = VAOAttributeLayout;
