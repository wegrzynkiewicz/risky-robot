import Core from 'robo24-core';

export default class Move {
    constructor({entityId, position, rotate}) {
        this.entityId = entityId;
        this.position = position;
        this.rotate = rotate;
    }
}

Core.Action.bind(Move, {
    code: 0x0011,
    name: 'move',
    type: 'binary',
});

Core.BinaryDescriptor.bind(Move, {
    properties: [
        {type: 'u32', property: 'entityId'},
        {type: 'vec3<f32>', property: 'position'},
        {type: 'vec3<f32>', property: 'rotate'},
    ],
});
