export default class AbstractShader {

    constructor({name, shaderContent, view}) {
        this.name = name;
        this.shaderContent = shaderContent;
        this.view = view;

        this.openGLShaderPointer = this.view.openGL.createShader(this.openGLShaderType);
        this.shaderSource(shaderContent.content);
        this.compileShader();
    }

    compileShader() {
        this.view.openGL.compileShader(this.openGLShaderPointer);
        if (!this.getShaderParameter(WebGL2RenderingContext['COMPILE_STATUS'])) {
            const message = this.getShaderInfoLog();
            this.deleteShader();
            throw new Error(`An error occurred compiling the shaders: ${message}`);
        }
    }

    deleteShader() {
        this.view.openGL.deleteShader(this.openGLShaderPointer);
        this.view.openGLShaderPointer = null;
    }

    getShaderInfoLog() {
        return this.view.openGL.getShaderInfoLog(this.openGLShaderPointer);
    }

    getShaderParameter(parameterCode) {
        return this.view.openGL.getShaderParameter(this.openGLShaderPointer, parameterCode)
    }

    shaderSource(shaderContent) {
        return this.view.openGL.shaderSource(this.openGLShaderPointer, shaderContent);
    }
}
