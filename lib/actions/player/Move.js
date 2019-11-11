import Action from "../../logic/actions/Action";

export default class Move {
    constructor({entityId, position, rotate}) {
        this.entityId = entityId;
        this.position = position;
        this.rotate = rotate;
    }
}

Action.bind(Move, {
    code: 0x0011,
    name: "move",
    type: "binary",
});
