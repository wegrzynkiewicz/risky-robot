import Action from './Action';

export default class ActionRepository {

    constructor() {
        this.actionNames = Object.create(null);
        this.actionCodes = Object.create(null);
    }

    register(actionConstructor) {
        const options = actionConstructor.prototype[Action.symbol];
        if (!options) {
            throw new Error('Cannot resister no bind action');
        }
        const {name, code} = options;
        this.actionNames[name] = actionConstructor;
        this.actionCodes[code] = actionConstructor;
    }

    getConstructorByName(constructorName) {
        const constructor = this.actionNames[constructorName];
        if (constructor === undefined) {
            throw new Error(`Message constructor named (${constructorName}) not exists`);
        }
        return constructor;
    }

    getCodeByName(constructorName) {
        return this.getConstructorByName(constructorName).prototype[Action.symbol].code;
    }

    getConstructorByCode(constructorCode) {
        const constructor = this.actionCodes[constructorCode];
        if (constructor === undefined) {
            throw new Error(`Message constructor code (${constructorCode}) not exists`);
        }
        return constructor;
    }

    getNameByCode(constructorCode) {
        return this.getConstructorByName(constructorCode).prototype[Action.symbol].name;
    }
}
