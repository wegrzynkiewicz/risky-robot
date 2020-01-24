import Program from "./Program";
import Shader from "./Shader";
import ShaderContent from "./ShaderContent";

export default class ProgramManager {

    constructor({view}) {
        this.view = view;
        this.shaders = Object.create(null);
        this.programs = Object.create(null);
        this.shaderContents = Object.create(null);
    }

    createProgram({name, vertexShader, fragmentShader}) {
        const {openGL} = this.view;
        const program = new Program({openGL, name, vertexShader, fragmentShader});
        this.programs[name] = program;
        return program;
    }

    createShader({name, type, shaderContent}) {
        const {openGL} = this.view;
        const shader = new Shader({openGL, name, type, shaderContent});
        this.shaders[name] = shader;
        return shader;
    }

    createShaderContent({name, content}) {
        const {openGL} = this.view;
        const shaderContent = new ShaderContent({name, content});
        this.shaderContents[name] = shaderContent;
        return shaderContent;
    }
}
