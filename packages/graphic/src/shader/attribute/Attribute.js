import * as Binary from 'risky-robot-binary';

export default class Attribute {

    constructor({location, name, openGLUniformType, size}) {
        this.location = location;
        this.name = name;
        this.openGLUniformType = openGLUniformType;
        this.size = size;
        this.type = Binary.translateUniformType(openGLUniformType);
    }
}
