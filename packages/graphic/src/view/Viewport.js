export default class Viewport {

    constructor({name, viewer, renderer, x, y, width, height}) {
        this.name = name;
        this.viewer = viewer;
        this.renderer = renderer;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render(system) {

    }
}
