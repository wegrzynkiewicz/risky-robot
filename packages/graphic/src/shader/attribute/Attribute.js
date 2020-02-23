import * as Binary from "robo24-binary";

export default class Attribute {

    constructor({location, name, type}) {
        this.location = location;
        this.name = name;
        this.type = Binary.types.resolve(type);
    }
}
