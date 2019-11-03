import messageSymbol from "../../messageSymbol";

export default class Move {
    constructor({entityId, position, rotate}) {
        this.entityId = entityId;
        this.position = position;
        this.rotate = rotate;
    }
}

Move.prototype[messageSymbol] = {
    code: 0x0011,
    name: "move",
    type: "binary",
    properties: [
        {type: "u32", property: "entityId"},
        {type: "vec3<f32>", property: "position"},
        {type: "vec3<f32>", property: "rotate"},
    ],
};
