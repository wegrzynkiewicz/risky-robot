import vertexAttributeTypes from "./vertexAttributeTypes";

export default class VAOAttributeLayout {
    constructor({name, type, normalize, divisor}) {
        this.name = name;
        this.type = vertexAttributeTypes.getTypeByName(type);
        this.normalize = normalize === undefined ? false : normalize;
        this.divisor = divisor === undefined ? 0 : divisor;
    }
};
