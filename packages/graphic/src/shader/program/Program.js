export default class Program {

    constructor({name, view, attributes, vertexShader, fragmentShader}) {
        this.name = name;
        this.view = view;
        this.attributes = attributes;
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
        this.openGLProgramPointer = this.view.openGL.createProgram();

        this.attachShader(this.vertexShader);
        this.attachShader(this.fragmentShader);
        this.linkProgram();
        this.bindAttributeLocations();
        this.bindUniformLocations();
    }

    attachShader(shader) {
        this.view.openGL.attachShader(
            this.openGLProgramPointer,
            shader.openGLShaderPointer
        );
    }

    bindAttributeLocations() {
        for (const attribute of this.attributes) {
            const attributeLocation = this.view.openGL.getAttribLocation(
                this.openGLProgramPointer,
                attribute.name
            );
            attribute.location = attributeLocation;
        }
    }

    bindUniformLocations() {
        for (const attribute of this.uniforms) {
            const uniformLocation = openGL.getUniformLocation(openGLProgramPointer, uniformName);
            this.uniformLocations[uniformName] = uniformLocation;
        }
    }

    deleteProgram() {
        this.view.openGL.deleteProgram(this.openGLProgramPointer);
        this.openGLProgramPointer = null;
        this.vertexShader = null;
        this.fragmentShader = null;
    }

    getProgramInfoLog() {
        return this.view.openGL.getProgramInfoLog(this.openGLProgramPointer);
    }

    getProgramParameter(parameterCode) {
        return this.view.openGL.getProgramParameter(
            this.openGLProgramPointer,
            parameterCode
        );
    }

    linkProgram() {
        this.view.openGL.linkProgram(this.openGLProgramPointer);
        if (!this.getProgramParameter(WebGL2RenderingContext['LINK_STATUS'])) {
            const message = this.getProgramInfoLog();
            this.deleteProgram();
            throw new Error(`Unable to initialize the shader program: ${message}`);
        }
    }

    use() {
        this.view.stateMachine.useProgram(this.openGLProgramPointer);
    }
}
