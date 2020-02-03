export default class Model {

    constructor({mesh, material}) {
        this.mesh = mesh;
        this.material = material;
    }

    shouldRender() {
        return true;
    }

    update(system, context) {

    }

    render(system, context) {

    }
}
