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
        const {stateMachine} = this.view;
        const program = new Program({stateMachine, name, vertexShader, fragmentShader});
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
        const shaderContent = new ShaderContent({name, content});
        this.shaderContents[name] = shaderContent;
        return shaderContent;
    }

    getProgramByName(name) {
        let program = this.programs[name];
        if (program === undefined) {
            const vertexShader = this.getShaderByName(`${name}.vertex`);
            const fragmentShader = this.getShaderByName(`${name}.fragment`);
            program = this.createProgram({name, vertexShader, fragmentShader});
        }
        return program;
    }

    getShaderByName(code) {
        let shader = this.shaders[code];
        if (shader === undefined) {
            const [name, type] = name.split(".");
            const shaderContent = this.getShaderContentByName(code);
            shader = this.createShader({name, type, shaderContent});
        }
        return shader;
    }

    getShaderContentByName(name) {
        const shaderContent = this.shaderContents[name];
        if (shaderContent === undefined) {
            throw new Error(`Shader content named (${name}) not exists.`);
        }
        return shaderContent;
    }

    makeProgram({programName, vertexShaderName, fragmentShaderName}) {
        const vertexShader = this.getShaderByName(vertexShaderName);
        const fragmentShader = this.getShaderByName(fragmentShaderName);
        const program = this.createProgram({name: programName, vertexShader, fragmentShader});
        return progra;
    }

    registerShaderContent(name, vertexContent, fragmentContent) {
        this.createShaderContent({name: `${name}.vertex`, content: vertexContent});
        this.createShaderContent({name: `${name}.fragment`, content: fragmentContent});
    }
}
