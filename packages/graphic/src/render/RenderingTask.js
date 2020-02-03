export default class RenderingTask {

    constructor({enabled, weight, renderer}) {
        this.renderer = renderer;
        this.enabled = enabled;
        this.weight = weight;
    }

    shouldRender(system, context) {
        return true;
    }

    render(system, context) {
        context.renderingTask = this;
        this.renderer.render(system, context);
    }
}
