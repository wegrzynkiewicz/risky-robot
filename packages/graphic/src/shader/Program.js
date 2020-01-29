export default class Program {

    constructor({name, view, vertexShader, fragmentShader}) {
        this.name = name;
        this.view = view;
        this.openGL = view.openGL;
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;

        this.uniformLocations = Object.create(null);
        this.attributeLocations = Object.create(null);

        this.openGLProgramPointer = this.openGL.createProgram();
        if (process.env.INSPECTOR_METADATA_ENABLED) {
            attachProgramInspectorData.call(this);
        }

        this.link();
        this.bindLayoutLocation();
    }

    bindLayoutLocation() {
        const {openGL, openGLProgramPointer, vertexShader, fragmentShader} = this;
        for (const attributeName of vertexShader.shaderContent.attributeNames) {
            const attributeLocation = openGL.getAttribLocation(openGLProgramPointer, attributeName);
            this.attributeLocations[attributeName] = attributeLocation;
        }

        const uniformNames = new Set([
            ...vertexShader.shaderContent.uniformNames,
            ...fragmentShader.shaderContent.uniformNames,
        ]);

        for (const uniformName of uniformNames.values()) {
            const uniformLocation = openGL.getUniformLocation(openGLProgramPointer, uniformName);
            this.uniformLocations[uniformName] = uniformLocation;
        }
    }

    deleteProgram() {
        this.openGL.deleteProgram(this.openGLProgramPointer);
        this.openGLProgramPointer = null;
        this.vertexShader = null;
        this.fragmentShader = null;
    }

    link() {
        const {openGL, openGLProgramPointer, vertexShader, fragmentShader} = this;
        vertexShader.attachShader(openGLProgramPointer);
        fragmentShader.attachShader(openGLProgramPointer);
        openGL.linkProgram(openGLProgramPointer);

        if (!openGL.getProgramParameter(openGLProgramPointer, openGL.LINK_STATUS)) {
            const message = openGL.getProgramInfoLog(openGLProgramPointer);
            this.deleteProgram();
            throw new Error(`Unable to initialize the shader program: ${message}`);
        }
    }

    use() {
        this.view.stateMachine.useProgram(this.openGLProgramPointer);
    }
}

function attachProgramInspectorData() {
    const tag = this.openGLProgramPointer.__SPECTOR_Object_TAG || {};
    tag.displayText += ", Name: " + this.name;
}

