import RenderingFlow from "./RenderingFlow";
import createStateMachine from "../state/createStateMachine";

export default class View {

    constructor({canvas}) {
        this.canvas = canvas;
        this.openGL = canvas.getContext('webgl2');

        if (!this.openGL) {
            throw new Error('Unable to initialize WebGL2. Your browser or machine may not support it.');
        }

        this.stateMachine = createStateMachine(this.openGL);
        this.renderingFlow = new RenderingFlow();
    }

    render(system, context) {
        this.renderingFlow.render(system, context);
    }
}
