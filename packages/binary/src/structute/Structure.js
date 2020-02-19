import Component from "./Component";

const mapComponents = component => new Component(component);

export default class Structure {

    constructor({name, count, components}) {
        this.name = name;
        this.count = count === undefined ? 1 : count;
        this.components = [...components];
    }

    createAccessor({dataView}) {

    }

    static compose({name, components}) {
        return new Structure({
            name,
            components: components.map(mapComponents)
        });
    }
}
