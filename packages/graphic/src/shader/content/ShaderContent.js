const regexUniform = new RegExp('(?<name>u_\\w+);$', 'mgu');
const regexAttribute = new RegExp('(?<name>a_\\w+);$', 'mgu');

// TODO: refactor
function findNames(array, regex, content) {
    while (true) {
        const matches = regex.exec(content);
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
