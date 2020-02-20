import UniformBlock from "./UniformBlock";
import UniformBuffer from "../buffer/UniformBuffer";

export default class UniformBlockManager {

    constructor({view}) {
        this.view = view;
        this.vaos = Object.create(null);
    }

    adjustUniformBlock({program, structure}) {
        const {view} = this;


        const uniformBlockLayout = null;

        const uniformBuffer = new UniformBuffer({
            view,
            name: `${structure.name.toLowerCase()}-buffer`,
            usage: WebGL2RenderingContext["STREAM_DRAW"],
        });


        constructor({name, view, program, uniformBlockLayout, uniformBuffer});

        const vao = new UniformBlock({view, name, program, layout, attributeBuffers, indicesBuffer});
    }

    createUniformBlock({program, structure}) {

    }

    createVAO({name, program, layout, attributeBuffers, indicesBuffer}) {
        const {view} = this;
        this.vaos[name] = vao;
        return vao;
    }
}
