import messageSymbol from "../../messageSymbol";

export default class Introduce {
    constructor({name, color}) {
        this.name = name;
        this.color = color;
    }
}

Introduce.prototype[messageSymbol] = {
    code: 0x02,
    name: "introduce",
    type: "json",
};
