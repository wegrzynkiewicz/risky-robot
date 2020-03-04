import AbstractShader from './AbstractShader';

export default class VertexShader extends AbstractShader {

    constructor({name, shaderContent, view}) {
        super({name, shaderContent, view});
    }

    get openGLShaderType() {
        return WebGL2RenderingContext.VERTEX_SHADER;
    }
}
