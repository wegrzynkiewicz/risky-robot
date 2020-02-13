export default class Mesh {

    constructor({name, primitives}) {
        this.name = name;
        this.primitives = [...primitives];
    }
}
