import Action from "../../../../core/lib/logic/actions/Action";

export default class Introduce {
    constructor({name, color}) {
        this.name = name;
        this.color = color;
    }
}

Action.bind(Introduce, {
    code: 0x02,
    name: "introduce",
    type: "json",
});
