import FragmentShader from '../shader/FragmentShader';
import Program from './Program';
import ShaderContent from '../content/ShaderContent';
import VertexShader from '../shader/VertexShader';

export default class ContentProgramFactory {

    constructor({view}) {
        this.view = view;
    }

    createProgram({fragment, name, vertex}) {
        const vertexShader = this.createShader({
            content: vertex,
            name: `${name}.vertex`,
            ShaderConstructor: VertexShader,
        });
        const fragmentShader = this.createShader({
            content: fragment,
            name: `${name}.fragment`,
            ShaderConstructor: FragmentShader,
        });
        const program = new Program({
            fragmentShader,
            name,
            vertexShader,
            view: this.view,
        });

        this.view.programManager.registerProgram(program);
        return program;
    }

    /** @private */
    createShader({content, name, ShaderConstructor}) {
        const shaderContent = new ShaderContent({
            content,
            name,
        });
        const shader = new ShaderConstructor({
            name,
            shaderContent,
            view: this.view,
        });
        this.view.shaderManager.registerShader(shader);

        return shader;
    }
}
