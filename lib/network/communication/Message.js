import messageSymbol from "./messageSymbol";
import BinaryDescriptor from "../../binary/BinaryDescriptor";

export default class Message {

    constructor({name, code, type}) {
        this.name = name;
        this.code = code;
        this.type = type;
    }

    static bind(constructor, options) {
        const message = new Message(options);
        constructor.prototype[messageSymbol] = message;
        if (message.type === "binary") {
            BinaryDescriptor.bind(constructor, options.descriptor);
        }
        return message;
    }
}
