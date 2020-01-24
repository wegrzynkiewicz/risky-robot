import createStateMachine from "../state/createStateMachine";
import OpenGLBufferManager from "../buffer/OpenGLBufferManager";
import ProgramManager from "../shader/ProgramManager";
import RenderingFlow from "./RenderingFlow";
import VAOManager from "../vao/VAOManager";

export default class View {

    constructor({canvas}) {
        this.canvas = canvas;
        this.openGL = canvas.getContext('webgl2');

        if (!this.openGL) {
            throw new Error('Unable to initialize WebGL2. Your browser or machine may not support it.');
        }

        const view = this;
        this.stateMachine = createStateMachine(this.openGL);
        this.renderingFlow = new RenderingFlow();
        this.bufferManager = new OpenGLBufferManager({view});
        this.vaoManager = new VAOManager({view});
        this.programManager = new ProgramManager({view});
    }

    render(system, context) {
        this.renderingFlow.render(system, context);
    }
}
