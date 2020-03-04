import VAO from './VAO';

export default class VAOManager {

    constructor({view}) {
        this.view = view;
        this.vaos = Object.create(null);
    }

    getVAOByName(vaoName) {
        return this.vaos[vaoName];
    }

    createVAO({attributeBuffers, indicesBuffer, layout, name, program}) {
        const {view} = this;
        const vao = new VAO({
            attributeBuffers,
            indicesBuffer,
            layout,
            name,
            program,
            view,
        });
        this.vaos[name] = vao;
        return vao;
    }
}
