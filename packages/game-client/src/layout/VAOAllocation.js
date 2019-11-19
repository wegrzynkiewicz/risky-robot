export default class VAOAllocation {

    constructor({vertices}) {
        this.vertives = vertices;
        this.attributes = Object.create(null);
    }

    add({name, stride, offset}) {
        this.attributes[name] = {stride, offset};
    }

    getAttributeAllocationByName(name) {
        const attribute = this.attributes[name];
        if (attribute === undefined) {
            throw new Error(`Not found attribute's allocation named (${name})`);
        }
        return attribute;
    }
}
