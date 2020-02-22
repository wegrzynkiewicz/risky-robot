const regexUniform = new RegExp("(?<name>u_\\w+);$", "mg");
const regexAttribute = new RegExp("(?<name>a_\\w+);$", "mg");

function findNames(array, regex, content) {
    while (true) {
        let matches = regex.exec(content);
        if (matches === null) {
            break;
        }
        const name = matches.groups.name;
        array.push(name);
    }
}

export default class ShaderContent {

    constructor({name, content}) {
        this.name = name;
        this.content = content;
        this.uniformNames = [];
        this.attributeNames = [];

        findNames(this.attributeNames, regexAttribute, this.content);
        findNames(this.uniformNames, regexUniform, this.content);
        findNames(this.uniformNames, regexUniform, this.content);
    }
}
