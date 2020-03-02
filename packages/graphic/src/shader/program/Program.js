import Attribute from '../attribute/Attribute';
import UniformBlock from '../../uniform/block/UniformBlock';
import Uniform from '../../uniform/Uniform';

export default class Program {

    constructor({fragmentShader, name, vertexShader, view}) {
        this.attributes = [];
        this.fragmentShader = fragmentShader;
        this.name = name;
        this.uniformBlocks = [];
        this.uniforms = [];
        this.vertexShader = vertexShader;
        this.view = view;

        this.openGLProgramPointer = this.view.openGL.createProgram();
        this.attachShader(this.vertexShader);
        this.attachShader(this.fragmentShader);
        this.linkProgram();
        this.bindAttributes();
        this.bindUniforms();
        this.bindUniformBlocks();
    }

    attachShader(shader) {
        this.view.openGL.attachShader(
            this.openGLProgramPointer,
            shader.openGLShaderPointer
        );
    }

    bindAttributes() {
        const attributeCount = this.getProgramParameter(WebGL2RenderingContext['ACTIVE_ATTRIBUTES']);
        for (let i = 0; i < attributeCount; ++i) {
            const info = this.view.openGL.getActiveAttrib(this.openGLProgramPointer, i);
            const location = this.view.openGL.getAttribLocation(
                this.openGLProgramPointer,
                info.name
            );
            const attribute = new Attribute({
                name: info.name,
                openGLUniformType: info.type,
                size: info.size,
                location,
            });
            this.attributes.push(attribute);
        }
    }

    bindUniformBlocks() {
        const uniformBlocksCount = this.getProgramParameter(WebGL2RenderingContext['ACTIVE_UNIFORM_BLOCKS']);
        for (let i = 0; i < uniformBlocksCount; i++) {
            const uniformBlock = new UniformBlock({
                blockIndex: i,
                program: this,
                view: this.view,
            });
            this.uniformBlocks.push(uniformBlock);
        }
    }

    bindUniforms() {
        const uniformsCount = this.getProgramParameter(WebGL2RenderingContext['ACTIVE_UNIFORMS']);
        for (let i = 0; i < uniformsCount; i++) {
            const info = this.getActiveUniform(i);
            const uniform = new Uniform({
                name: info.name,
                program: this,
                size: info.size,
                openGLUniformType: info.type,
                view: this.view,
            });
            this.uniforms.push(uniform);
        }
    }

    deleteProgram() {
        this.view.openGL.deleteProgram(this.openGLProgramPointer);
        this.openGLProgramPointer = null;
        this.vertexShader = null;
        this.fragmentShader = null;
    }

    getActiveUniform(index) {
        return this.view.openGL.getActiveUniform(this.openGLProgramPointer, index);
    }

    getAttributeByName(attributeName) {
        for (const attribute of this.attributes) {
            if (attribute.name === attributeName) {
                return attribute;
            }
        }
        throw new Error(`Attribute named (${attributeName}) not found`);
    }

    getUniformBlockByName(blockName) {
        for (const uniformBlock of this.uniformBlocks) {
            if (uniformBlock.name === blockName) {
                return uniformBlock;
            }
        }
        throw new Error(`Uniform block named (${blockName}) not found`);
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
