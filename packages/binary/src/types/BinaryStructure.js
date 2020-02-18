import {BinaryComponent} from "../binary";

const mapComponents = component => new BinaryComponent(component);

export default class BinaryStructure {

    constructor({name, count, components}) {
        this.name = name;
        this.count = count === undefined ? 1 : count;
        this.components = [...components];
    }

    createAccessor({dataView}) {

    }

    static compose({name, components}) {
        return new BinaryStructure({
            name,
            components: components.map(mapComponents)
        });
    }
}
