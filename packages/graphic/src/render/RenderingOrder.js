export default class RenderingOrder {

    constructor() {
        this.sceneNodes = new Set();
    }

    add(sceneNode) {
        this.sceneNodes.add(sceneNode);
    }

    clear() {
        this.sceneNodes.clear();
    }
}
