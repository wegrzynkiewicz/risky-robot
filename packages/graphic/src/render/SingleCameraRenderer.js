import CullingManager from "../culling/CullingManager";

export default class SingleCameraRenderer {

    constructor({camera, viewport, sceneNode}) {
        this.camera = camera;
        this.viewport = viewport;
        this.sceneNode = sceneNode;
    }

    render(system, context) {
        context.renderer = this;
        context.cullingManager.clear();
        this.sceneNode.shouldRender(system, context);
        this.sceneNode.render(system, context);
    }
}
