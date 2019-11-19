export default class VAOAllocation {

    constructor() {
        this.attributes = Object.create(null);
    }

    add({name, stride, offset}) {
        this.attributes[name] = {stride, offset};
    }

    getStride(name) {
        return this.getAttributeAllocation(name).stride;
    }

    getOffset(name) {
        return this.getAttributeAllocation(name).offset;
    }

    getAttributeAllocation(name) {
        const attribute = this.attributes[name];
        if (attribute === undefined) {
            throw new Error(`Not found attribute's allocation named (${name})`);
        }
        return attribute;
    }
}
