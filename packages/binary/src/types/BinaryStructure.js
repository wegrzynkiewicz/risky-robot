import {BinaryComponent} from "../binary";

const mapComponents = component => new BinaryComponent(component);

export default class BinaryStructure {

    constructor({name, components}) {
        this.name = name;
        this.components = new Map(components);
        for (const component of components) {
            this.components.set(component.name, component)
        }
    }

    static compose({name, components}) {
        return new BinaryStructure({
            name,
            components: components.map(mapComponents)
        });
    }
}
