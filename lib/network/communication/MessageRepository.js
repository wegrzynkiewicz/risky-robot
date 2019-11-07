import MessageSymbol from "./messageSymbol";

export default class MessageRepository {

    constructor() {
        this.messageNames = Object.create(null);
        this.messageCodes = Object.create(null);
    }

    register(messageConstructor) {
        const options = messageConstructor.prototype[MessageSymbol];
        const {name, code} = options;
        this.messageNames[name] = messageConstructor;
        this.messageCodes[code] = messageConstructor;
    }

    getConstructorByName(constructorName) {
        const constructor = this.messageNames[constructorName];

        if (constructor === undefined) {
            throw new Error(`Message constructor named (${constructorName}) not exists`);
        }

        return constructor;
    }

    getConstructorByCode(constructorCode) {
        const constructor = this.messageCodes[constructorCode];

        if (constructor === undefined) {
            throw new Error(`Message constructor code (${constructorCode}) not exists`);
        }

        return constructor;
    }
}
