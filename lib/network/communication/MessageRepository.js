import MessageSymbol from "./messageSymbol";
import binaryDescriptor from "../../binary/binaryDescriptor";

export default class MessageRepository {

    constructor() {
        this.messageNames = Object.create(null);
        this.messageCodes = Object.create(null);
    }

    register(messageConstructor) {
        const options = messageConstructor.prototype[MessageSymbol];
        const {name, code, type, descriptor} = options;
        this.messageNames[name] = messageConstructor;
        this.messageCodes[code] = messageConstructor;

        if (type === "binary") {
            binaryDescriptor.compile(messageConstructor, descriptor);
        }
    }

    getConstructorByName(constructorName) {
        const {[constructorName]: constructor} = this.messageNames;

        if (constructor === undefined) {
            throw new Error(`Message constructor named (${constructorName}) not exists`);
        }

        return constructor;
    }

    getConstructorByCode(constructorCode) {
        const {[constructorCode]: constructor} = this.messageCodes;

        if (constructor === undefined) {
            throw new Error(`Message constructor code (${constructorCode}) not exists`);
        }

        return constructor;
    }
}
