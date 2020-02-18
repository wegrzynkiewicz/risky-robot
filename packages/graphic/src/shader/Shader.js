// TODO: create universal shader

export default class Shader {

    constructor({name, type, openGL, shaderContent}) {

        const openGLShaderType = openGL[type];
        if (openGLShaderType === undefined) {
            throw new Error("Invalid shader type.");
        }

        this.name = name;
        this.openGL = openGL;
        this.openGLShaderType = openGLShaderType;
        this.openGLShaderTypeName = type;
        this.shaderContent = shaderContent;

        this.openGLShaderPointer = openGL.createShader(openGLShaderType);
    }

    compile() {
        const {openGL, openGLShaderPointer, shaderContent} = this;
        openGL.shaderSource(openGLShaderPointer, shaderContent.content);
        openGL.compileShader(openGLShaderPointer);

        if (!openGL.getShaderParameter(openGLShaderPointer, openGL.COMPILE_STATUS)) {
            const message = openGL.getShaderInfoLog(openGLShaderPointer);
            this.delete();
            throw new Error(`An error occurred compiling the shaders: ${message}`);
        }
    }

    attachShader(openGLProgramPointer) {
        this.openGL.attachShader(openGLProgramPointer, this.openGLShaderPointer);
    }

    delete() {
        this.openGL.deleteShader(this.openGLShaderPointer);
        this.openGLShaderType = null;
        this.openGLShaderTypeName = null;
        this.openGLShaderPointer = null;
    }
}
