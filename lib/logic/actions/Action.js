import actionSymbol from "./actionSymbol";

export default class Action {

    constructor({name, code, type}) {
        this.name = name;
        this.code = code;
        this.type = type;
    }

    static bind(constructor, options) {
        const action = new Action(options);
        constructor.prototype[actionSymbol] = action;
        return action;
    }
}
