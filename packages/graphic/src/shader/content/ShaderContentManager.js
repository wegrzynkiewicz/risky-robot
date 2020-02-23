export default class ShaderContentManager {

    constructor({view}) {
        this.view = view;
        this.shaderContents = Object.create(null);
    }

    registerShaderContent(shaderContent) {
        this.shaderContents[shaderContent.name] = shaderContent;
    }

    getShaderContentByName(name) {
        const shaderContent = this.shaderContents[name];
        if (shaderContent === undefined) {
            throw new Error(`Shader content named (${name}) not exists.`);
        }
        return shaderContent;
    }
}
