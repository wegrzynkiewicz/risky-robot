export default class System {

    constructor({view, animationLoop, resourceManager, gltfManager}) {
        this.gltfManager = gltfManager;
        this.resourceManager = resourceManager;

        this.view = view;
        this.context = Object.create(null);

        this.animationLoop = animationLoop;
        this.animationLoop.on('frame', this.loop.bind(this));
    }

    loop(deltaTime) {
        this.context.deltaTime = deltaTime;
        this.view.sceneManager.update(this, this.context);
        this.view.render(this, this.context);
    }
}
