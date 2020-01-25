import SceneNode from "./SceneNode"

export default class Scene extends SceneNode {

    constructor({name}) {
        super({name});
    }

    render(system, context) {
        const {stateMachine, openGL} = system.view;

        stateMachine.clearDepth(1.0);
        stateMachine.depthFunc(openGL.LEQUAL);
        stateMachine.enable(openGL.DEPTH_TEST);

        stateMachine.frontFace(openGL.CCW);
        stateMachine.cullFace(openGL.BACK);
        stateMachine.enable(openGL.CULL_FACE);

        stateMachine.blendFunc(openGL.SRC_ALPHA, openGL.ONE_MINUS_SRC_ALPHA);
        stateMachine.enable(openGL.BLEND);

        stateMachine.clearColor(0.0, 0.0, 0.0, 1.0);

        openGL.clear(openGL.COLOR_BUFFER_BIT | openGL.DEPTH_BUFFER_BIT);

        super.render(system, context);
    }
}
