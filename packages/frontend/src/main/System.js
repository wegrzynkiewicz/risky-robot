export default class System {

    constructor({view, sceneManager, animationLoop, resourceManager}) {
        this.view = view;
        this.sceneManager = sceneManager;
        this.context = Object.create(null);
        this.resourceManager = resourceManager;
        this.animationLoop = animationLoop;
        this.animationLoop.on("frame", this.loop.bind(this));
    }

    loop(deltaTime) {
        this.context.deltaTime = deltaTime;
        this.sceneManager.update(this, this.context);
        this.view.render(this, this.context);
    }
}
