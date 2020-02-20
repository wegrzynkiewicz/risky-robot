import typeSymbol from "./typeSymbol";

export default class TypeRepository {

    constructor() {
        this.types = Object.create(null);
    }

    registerType(type) {
        this.types[type.name] = type;
    }

    resolve(type) {
        if (typeof type === "string") {
            return this.getTypeByName(type);
        }

        if (type[typeSymbol] === true) {
            return type;
        }

        if (type.isStructure === true) {
            return type;
        }

        throw new Error("Cannot resolve type.");
    }

    getTypeByName(typeName) {
        const type = this.types[typeName];
        if (type === undefined) {
            throw new Error(`Not found type named (${typeName})`);
        }
        return this.types[typeName];
    }
}
