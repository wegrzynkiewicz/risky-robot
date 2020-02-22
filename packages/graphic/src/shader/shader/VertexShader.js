import AbstractShader from './AbstractShader';

export default class VertexShader extends AbstractShader {

    constructor(options) {
        super(options);
    }

    get openGLShaderType() {
        return WebGL2RenderingContext['VERTEX_SHADER'];
    }
}
