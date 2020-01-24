import VAO from "./VAO";

export default class VAOManager {

    constructor({view}) {
        this.view = view;
        this.vaos = Object.create(null);
    }

    getVAOByName(vaoName) {
        return this.vaos[vaoName];
    }

    createVAO({name, program, vaoLayout, buffers}) {
        const {view} = this;
        const vao = new VAO({view, program, name, vaoLayout, buffers});
        this.vaos[name] = vao;
        return vao;
    }
}
