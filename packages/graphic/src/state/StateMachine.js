import * as mc from "./mementoCreator";

const modifiers = [
    mc.createEnableStateMemento(),
    mc.createColorStateMemento("BLEND_COLOR", "blendColor"),
    mc.createColorStateMemento("COLOR_CLEAR_VALUE", "clearColor"),

    mc.createBindStateMemento("ACTIVE_BUFFER", "clearColor"),
];

export default class StateMachine {

    constructor(openGL) {
        this.openGL = openGL;
        this.state = Object.create(null);

        for (const modifier of modifiers) {
            modifier.call(this);
        }
    }

    bindBuffer() {

    }
}
