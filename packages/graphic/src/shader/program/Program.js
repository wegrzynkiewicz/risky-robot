import Attribute from "../attribute/Attribute";
import * as Binary from "robo24-binary";

export default class Program {

    constructor({fragmentShader, name, vertexShader, view}) {
        this.attributes = [];
        this.fragmentShader = fragmentShader;
        this.name = name;
        this.uniforms = [];
        this.vertexShader = vertexShader;
        this.view = view;

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
        const attributeCount = this.getProgramParameter(WebGL2RenderingContext['ACTIVE_ATTRIBUTES']);
        for (let i = 0; i < attributeCount; ++i) {
            const info = this.view.openGL.getActiveAttrib(this.openGLProgramPointer, i);
            const location = this.view.openGL.getAttribLocation(
                this.openGLProgramPointer,
                info.name
            );
            const attribute = new Attribute({
                name: info.name,
                type: Binary.translateUniformType(info.type),
                location,
            });
            this.attributes.push(attribute);
        }
    }

    bindUniformLocations() {
        for (const uniform of this.uniforms) {
            const uniformLocation = this.view.openGL.getUniformLocation(
                this.openGLProgramPointer,
                uniform.name
            );
            uniform.location = uniformLocation;
        }
    }

    deleteProgram() {
        this.view.openGL.deleteProgram(this.openGLProgramPointer);
        this.openGLProgramPointer = null;
        this.vertexShader = null;
        this.fragmentShader = null;
    }

    getAttributeByName(attributeName) {
        for (const attribute of this.attributes) {
            if (attribute.name === attributeName) {
                return attribute;
            }
        }
        throw new Error(`Attribute named (${attributeName}) not found`);
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
