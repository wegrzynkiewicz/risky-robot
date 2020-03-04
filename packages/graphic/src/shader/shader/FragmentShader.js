import AbstractShader from './AbstractShader';

export default class FragmentShader extends AbstractShader {

    constructor({name, shaderContent, view}) {
        super({name, shaderContent, view});
    }

    get openGLShaderType() {
        return WebGL2RenderingContext.FRAGMENT_SHADER;
    }
}
