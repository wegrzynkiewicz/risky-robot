import Viewport from "./Viewport";

export default class View {

    constructor({canvas}) {
        this.canvas = canvas;
        this.openGL = canvas.getContext('webgl2');

        if (!this.openGL) {
            throw new Error('Unable to initialize WebGL2. Your browser or machine may not support it.');
        }

        this.pipeline = new Pipeline();
    }

    createViewport({name, renderer, x, y, width, height}) {
        const viewer = this;
        const viewport = new Viewport({name, renderer, viewer, x, y, width, height});
        this.viewports.set(name, viewport);
        return viewport;
    }
}
