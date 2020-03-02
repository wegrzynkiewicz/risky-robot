import SceneNode from './SceneNode'

export default class Scene extends SceneNode {
    constructor(options) {
        super(options);
    }

    init(game) {
        const {openGL} = game;
        openGL.clearColor(0.0, 0.0, 0.0, 1.0);
        openGL.clearDepth(1.0);
        openGL.enable(openGL.DEPTH_TEST);
        openGL.depthFunc(openGL.LEQUAL);
        openGL.enable(openGL.CULL_FACE);
        openGL.cullFace(openGL.BACK);
        openGL.frontFace(openGL.CCW);
        openGL.blendFunc(openGL.SRC_ALPHA, openGL.ONE_MINUS_SRC_ALPHA);
        openGL.enable(openGL.BLEND);
    }

    render(game) {
        const {openGL} = game;

        openGL.clear(openGL.COLOR_BUFFER_BIT | openGL.DEPTH_BUFFER_BIT);

        super.render(game);
    }
}
