const shaderTypes = {
    vertex: {
        openGLShaderType: WebGLRenderingContext["VERTEX_SHADER"],
        openGLShaderTypeName: "VERTEX_SHADER",
    },
    fragment: {
        openGLShaderType: WebGLRenderingContext["FRAGMENT_SHADER"],
        openGLShaderTypeName: "FRAGMENT_SHADER"
    }
};

export default class Shader {

    constructor({name, type, openGL, shaderContent}) {
        const {openGLShaderType, openGLShaderTypeName} = shaderTypes[type];
        if (openGLShaderTypeName === undefined) {
            throw new Error("Invalid shader type.");
        }

        this.name = name;
        this.openGL = openGL;
        this.openGLShaderType = openGLShaderType;
        this.openGLShaderTypeName = openGLShaderTypeName;
        this.shaderContent = shaderContent;

        this.openGLShaderPointer = openGL.createShader(openGLShaderType);
        if (process.env.INSPECTOR_METADATA_ENABLED) {
            attachShaderInspectorData.call(this);
        }

        this.compile();
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

function attachShaderInspectorData() {
    const tag = this.openGLShaderPointer.__SPECTOR_Object_TAG || {};
    tag.displayText += ", Name: " + this.name;
}
