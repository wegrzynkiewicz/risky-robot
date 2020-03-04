export default class ShaderManager {

    constructor({view}) {
        this.view = view;
        this.shadersMap = new Map();
    }

    registerShader(shader) {
        this.shadersMap.set(shader.name, shader);
    }

    getShaderByName(name) {
        if (!this.shadersMap.has(name)) {
            throw new Error(`Shader named (${name}) not found.`);
        }
        return this.shadersMap.get(name);
    }
}
