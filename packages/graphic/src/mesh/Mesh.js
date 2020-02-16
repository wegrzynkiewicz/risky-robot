export default class Mesh {

    constructor({name, primitives}) {
        this.name = name;
        this.primitives = [...primitives];
    }

    render(system, context) {
        for (const primitive of this.primitives) {
            primitive.render(system, context);
        }
    }
}
