import * as Binary from 'robo24-binary';

export default class Attribute {

    constructor({location, name, size, openGLUniformType}) {
        this.location = location;
        this.name = name;
        this.size = size;
        this.openGLUniformType = openGLUniformType;
        this.type = Binary.translateUniformType(openGLUniformType);
    }
}
