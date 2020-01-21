export default class System {

    constructor({viewer, sceneManager, loop}) {
        this.viewer = viewer;
        this.deltaTime = 0.0;
        this.sceneManager = sceneManager;
        this.loop = loop;
        this.loop.on("frame", this.loop.bind(this));
    }

    loop(deltaTime) {
        this.deltaTime = deltaTime;
        this.sceneManager.update(this);
        for (let viewport of this.viewer.viewports.values()) {
            viewport.render(this);
        }
    }
}
