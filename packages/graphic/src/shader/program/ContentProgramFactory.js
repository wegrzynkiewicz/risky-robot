import FragmentShader from '../shader/FragmentShader';
import Program from './Program';
import ShaderContent from '../content/ShaderContent';
import VertexShader from '../shader/VertexShader';


export default class ContentProgramFactory {

    constructor({view}) {
        this.view = view;
    }

    createProgram({fragment, name, vertex}) {
        const vertexShader = this.createShader(this, `${name}.vertex`, vertex, VertexShader);
        const fragmentShader = this.createShader(this, `${name}.fragment`, fragment, FragmentShader);
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
    createShader(name, content, constructor) {
        const shaderContent = new ShaderContent({
            content,
            name,
        });
        const shader = new constructor({
            name,
            shaderContent,
            view: this.view,
        });
        this.view.shaderManager.registerShader(shader);

        return shader;
    }
}
