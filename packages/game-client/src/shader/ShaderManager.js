import Shader from './Shader';

export default class ShaderManager {

    constructor(openGL, shaderRepository) {
        this.openGL = openGL;
        this.repository = shaderRepository;
        this.shadersByNames = Object.create(null);
    }

    getShaderByName(shaderName) {
        if (this.shadersByNames[shaderName] === undefined) {
            const contents = this.repository.getShaderContentByName(shaderName);
            const shader = new Shader(this.openGL, contents);
            this.shadersByNames[shaderName] = shader;
        }
        return this.shadersByNames[shaderName];
    }
}
