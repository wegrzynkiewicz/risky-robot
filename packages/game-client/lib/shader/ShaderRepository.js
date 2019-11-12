export default class ShaderRepository {

    constructor() {
        this.shadersByNames = Object.create(null);
    }

    register(name, contents) {
        this.shadersByNames[name] = contents;
    }

    getShaderContentByName(shaderName) {
        const contents = this.shadersByNames[shaderName];

        if (contents === undefined) {
            throw new Error(`Shader program content named (${shaderName}) not exists`);
        }

        return contents;
    }
}
