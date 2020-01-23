export default class System {

    constructor({view, sceneManager, loop}) {
        this.view = view;
        this.sceneManager = sceneManager;
        this.context = Object.create(null);
        this.loop = loop;
        this.loop.on("frame", this.loop.bind(this));
    }

    loop(deltaTime) {
        this.context.deltaTime = deltaTime;
        this.sceneManager.update(this, this.context);
        this.view.render(this, this.context);
    }
}
