import createStateMachine from "../state/createStateMachine";
import OpenGLBufferManager from "../buffer/OpenGLBufferManager";
import ProgramManager from "../shader/ProgramManager";
import RenderingFlow from "./RenderingFlow";
import RenderingOrder from "./RenderingOrder";
import VAOManager from "../vao/VAOManager";
import SceneManager from "../scene/SceneManager";

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
        this.renderingOrder = new RenderingOrder();
        this.sceneManager = new SceneManager();
    }

    render(system, context) {
        context.view = this;
        context.renderingOrder = this.renderingOrder;
        this.renderingFlow.render(system, context);
    }
}
