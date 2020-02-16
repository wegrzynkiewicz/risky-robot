export default class UniformBlockBlueprint {

    constructor({name, uniforms}) {
        this.name = name;
        this.uniformBlueprints = [...uniforms];
    }
}
