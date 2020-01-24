import VAOCreator from "./VAOCreator";

export default class VAOManager {

    constructor({view}) {
        this.view = view;
        this.creator = new VAOCreator({view});
        this.vaos = Object.create(null);
    }

    getVAOByName(vaoName) {
        return this.vaos[vaoName];
    }

    createVAO({name, shader, vertexLayout, buffers}) {
        const vao = this.creator.createVAO({name, shader, vertexLayout, buffers});
        this.vaos[name] = vao;
        return vao;
    }
}
