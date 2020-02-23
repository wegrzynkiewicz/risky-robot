export default class ShaderManager {

    constructor({view}) {
        this.view = view;
        this.shaders = Object.create(null);
    }

    registerShader(shader) {
        this.shaders[shader.name] = shader;
    }

    getShaderByName(name) {
        let shader = this.shaders[name];
        if (shader === undefined) {
            throw new Error(`Shader named (${name}) not found.`);
        }
        return shader;
    }
}
