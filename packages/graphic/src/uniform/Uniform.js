import * as Binary from "robo24-binary";

export default class Uniform {

    constructor({name, program, size, openGLUniformType, view}) {
        this.name = name;
        this.program = program;
        this.view = view;
        this.openGLUniformType = openGLUniformType;
        this.type = Binary.translateUniformType(openGLUniformType);
        this.size = size;

        this.index = this.getIndex();

        this.blockIndex = this.getActiveUniformParameter(
            WebGL2RenderingContext['UNIFORM_BLOCK_INDEX']
        );
        this.byteOffset = this.getActiveUniformParameter(
            WebGL2RenderingContext['UNIFORM_OFFSET']
        );
        this.arrayByteStride = this.getActiveUniformParameter(
            WebGL2RenderingContext['UNIFORM_ARRAY_STRIDE']
        );
        this.matrixByteStride = this.getActiveUniformParameter(
            WebGL2RenderingContext['UNIFORM_MATRIX_STRIDE']
        );
        this.isRowMajor = this.getActiveUniformParameter(
            WebGL2RenderingContext['UNIFORM_IS_ROW_MAJOR']
        );
    }

    getIndex() {
        const [index] = this.view.openGL.getUniformIndices(
            this.program.openGLProgramPointer,
            [this.name],
        );
        return index;
    }

    getActiveUniformParameter(parameterCode) {
        const [parameter] = this.view.openGL.getActiveUniforms(
            this.program.openGLProgramPointer,
            [this.index],
            parameterCode,
        );
        return parameter;
    }
}
