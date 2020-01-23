export default class SingleCameraRenderer {

    constructor({camera, viewport, scene}) {
        this.camera = camera;
        this.viewport = viewport;
        this.scene = scene;
    }

    render(system, context) {
        this.scene.render(system, context);
    }
}
