import messageSymbol from "./messageSymbol";

export default class Message {

    constructor({name, code, type}) {
        this.name = name;
        this.code = code;
        this.type = type;
    }

    static bind(constructor, options) {
        const message = new Message(options);
        constructor.prototype[messageSymbol] = message;
        return message;
    }
}
