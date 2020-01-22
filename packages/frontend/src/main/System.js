export default class System {

    constructor({viewer, sceneManager, loop}) {
        this.viewer = viewer;
        this.sceneManager = sceneManager;
        this.loop = loop;
        this.loop.on("frame", this.loop.bind(this));
    }

    loop(deltaTime) {
        this.sceneManager.update(this, deltaTime);
        for (let viewport of this.viewer.viewports.values()) {
            viewport.render(this, deltaTime);
        }
    }
}
