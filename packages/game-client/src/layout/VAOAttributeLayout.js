import vertexAttributeTypes from "./vertexAttributeTypes";

export default class VAOAttributeLayout {
    constructor({name, type, normalize}) {
        this.name = name;
        this.type = vertexAttributeTypes.getTypeByName(type);
        this.normalize = normalize === undefined ? false : normalize;
    }
};
