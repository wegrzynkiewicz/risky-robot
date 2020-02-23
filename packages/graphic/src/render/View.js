import createStateMachine from "../state/createStateMachine";
import OpenGLBufferManager from "../buffer/BufferManager";
import ProgramManager from "../shader/program/ProgramManager";
import RenderingFlow from "./RenderingFlow";
import RenderingOrder from "./RenderingOrder";
import VAOManager from "../vao/VAOManager";
import SceneManager from "../scene/SceneManager";
import ShaderManager from "../shader/shader/ShaderManager";
import UniformBlockManager from "../uniform/block/UniformBlockManager";
import UniformBufferManager from "../uniform/buffer/UniformBufferManager";

export default class View {

    constructor({canvas}) {
        this.canvas = canvas;
        this.openGL = canvas.getContext('webgl2');

        if (!this.openGL) {
            throw new Error('Unable to initialize WebGL2. Your browser or machine may not support it.');
        }

        const view = this;
        this.bufferManager = new OpenGLBufferManager({view});
        this.programManager = new ProgramManager({view});
        this.renderingFlow = new RenderingFlow();
        this.renderingOrder = new RenderingOrder();
        this.sceneManager = new SceneManager();
        this.shaderManager = new ShaderManager({view});
        this.stateMachine = createStateMachine(this.openGL);
        this.uniformBlockManager = new UniformBlockManager({view});
        this.uniformBufferManager = new UniformBufferManager({view});
        this.vaoManager = new VAOManager({view});
    }

    render(system, context) {
        this.renderingFlow.render(system, context);
    }
}
