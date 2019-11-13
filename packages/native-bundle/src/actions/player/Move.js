import Action from "../../../../core/src/logic/actions/Action";
import BinaryDescriptor from "../../../../core/src/binary/BinaryDescriptor";

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

BinaryDescriptor.bind(Move, {
    properties: [
        {type: "u32", property: "entityId"},
        {type: "vec3<f32>", property: "position"},
        {type: "vec3<f32>", property: "rotate"},
    ],
});
