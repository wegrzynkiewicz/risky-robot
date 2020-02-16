import VAO from "./VAO";

export default class VAOManager {

    constructor({view}) {
        this.view = view;
        this.vaos = Object.create(null);
    }

    getVAOByName(vaoName) {
        return this.vaos[vaoName];
    }

    createVAO({name, program, layout, attributeBuffers, indicesBuffer}) {
        const {view} = this;
        const vao = new VAO({view, name, program, layout, attributeBuffers, indicesBuffer});
        this.vaos[name] = vao;
        return vao;
    }
}
