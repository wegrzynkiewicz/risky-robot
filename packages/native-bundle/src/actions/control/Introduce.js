import Core from 'robo24-core';

export default class Introduce {
    constructor({name, color}) {
        this.name = name;
        this.color = color;
    }
}

Core.Action.bind(Introduce, {
    code: 0x02,
    name: 'introduce',
    type: 'json',
});
