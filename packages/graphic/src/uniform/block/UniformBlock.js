import * as Binary from 'robo24-binary';

let uniformBlockId = 0;

export default class UniformBlock {

    constructor({blockIndex, program, view}) {
        this.blockIndex = blockIndex;
        this.program = program;
        this.view = view;
        this.uniforms = [];

        this.uniformBlockId = uniformBlockId++;
        this.uniformBindingPoint = null;

        this.name = this.getActiveUniformBlockName();

        this.bindingIndex = this.getActiveUniformBlockParameter(
            WebGL2RenderingContext['UNIFORM_BLOCK_BINDING'],
        );
        this.byteLength = this.getActiveUniformBlockParameter(
            WebGL2RenderingContext['UNIFORM_BLOCK_DATA_SIZE'],
        );
        this.activeUniformsCount = this.getActiveUniformBlockParameter(
            WebGL2RenderingContext['UNIFORM_BLOCK_ACTIVE_UNIFORMS'],
        );
        this.activeUniformsIndices = this.getActiveUniformBlockParameter(
            WebGL2RenderingContext['UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES'],
        );
        this.isReferencedByVertexShader = this.getActiveUniformBlockParameter(
            WebGL2RenderingContext['UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER'],
        );
        this.isReferencedByFragmentShader = this.getActiveUniformBlockParameter(
            WebGL2RenderingContext['UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER'],
        );

        for (const uniformIndex of this.activeUniformsIndices.values()) {
            const uniform = this.program.uniforms[uniformIndex];
            this.uniforms.push(uniform);
            uniform.uniformBlock = this;
        }
    }

    createBufferData() {
        const structure = new Binary.Structure({
            name: this.name,
            components: this.uniforms.map(uniform => uniform.createBinaryComponent()),
        });
        const bufferData = Binary.BufferData.createFromStructure(structure);
        return bufferData;
    }

    getActiveUniformBlockName() {
        return this.view.openGL.getActiveUniformBlockName(
            this.program.openGLProgramPointer,
            this.blockIndex,
        );
    }

    getActiveUniformBlockParameter(parameterCode) {
        return this.view.openGL.getActiveUniformBlockParameter(
            this.program.openGLProgramPointer,
            this.blockIndex,
            parameterCode,
        );
    }

    setUniformBindingPoint(uniformBindingPoint) {
        uniformBindingPoint.uniformBlocks.add(this);
        this.uniformBindingPoint = uniformBindingPoint;
    }

    uniformBlockBinding(bindingIndex) {
        this.bindingIndex = bindingIndex;
        return this.view.stateMachine.uniformBlockBinding(
            this.program.openGLProgramPointer,
            this.blockIndex,
            this.bindingIndex,
        );
    }
}
