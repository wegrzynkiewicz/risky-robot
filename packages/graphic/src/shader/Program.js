export default class Program {

    constructor({name, openGL, vertexShader, fragmentShader}) {
        this.name = name;
        this.openGL = openGL;
        this.openGLProgramPointer = openGL.createProgram();
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;

        this.uniformLocations = Object.create(null);
        this.attributeLocations = Object.create(null);

        this.link();
        this.bindLayoutLocation();
    }

    link() {
        const {openGL, openGLProgramPointer, vertexShader, fragmentShader} = this;
        vertexShader.attachShader(openGLProgramPointer);
        fragmentShader.attachShader(openGLProgramPointer);
        openGL.linkProgram(openGLProgramPointer);

        if (!openGL.getProgramParameter(openGLProgramPointer, openGL.LINK_STATUS)) {
            const message = openGL.getProgramInfoLog(program);
            this.deleteProgram();
            throw new Error(`Unable to initialize the shader program: ${message}`);
        }
    }

    bindLayoutLocation() {
        const {openGL, openGLProgramPointer, vertexShader, fragmentShader} = this;
        for (const attributeName of vertexShader.shaderContent.attributes) {
            const attributeLocation = openGL.getAttribLocation(openGLProgramPointer, attributeName);
            this.attributeLocations.push(attributeLocation);
        }

        const uniformNames = new Set([
            ...vertexShader.shaderContent.uniformNames,
            ...fragmentShader.shaderContent.uniformNames,
        ]);

        for (const uniformName of uniformNames.values()) {
            const uniformLocation = openGL.getUniformLocation(openGLProgramPointer, uniformName);
            this.uniformLocations.push(uniformLocation);
        }
    }

    deleteProgram() {
        this.openGL.deleteProgram(this.openGLProgramPointer);
        this.openGLProgramPointer = null;
        this.vertexShader = null;
        this.fragmentShader = null;
    }
}
