import Program from './Program';
import FragmentShader from '../shader/FragmentShader';
import ShaderContent from '../content/ShaderContent';
import VertexShader from '../shader/VertexShader';

function createShader(name, content, constructor) {
    const shaderContent = new ShaderContent({
        name,
        content,
    });
    const shader = new constructor({
        name,
        shaderContent,
        view: this.view,
    });
    this.view.shaderManager.registerShader(shader);

    return shader;
}

export default class ContentProgramFactory {

    constructor({view}) {
        this.view = view;
    }

    createProgram({fragment, name, vertex}) {
        const vertexShader = createShader.call(this, `${name}.vertex`, vertex, VertexShader);
        const fragmentShader = createShader.call(this, `${name}.fragment`, fragment, FragmentShader);
        const program = new Program({
            fragmentShader,
            name,
            vertexShader,
            view: this.view,
        });

        this.view.programManager.registerProgram(program);
        return program;
    }
}
