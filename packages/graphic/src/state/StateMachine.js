import MementoCreator from "./MementoCreator";

const mc = new MementoCreator();
mc.createEnableStateMemento();
mc.createColorStateMemento("BLEND_COLOR", "blendColor");
mc.createColorStateMemento("COLOR_CLEAR_VALUE", "clearColor");
mc.createDummyStateMemento("bindBuffer");
mc.createDummyStateMemento("deleteBuffer");
for (const name of ["Program", "Shader", "Buffer", "Texture", "RenderBuffer", "FrameBuffer"]) {
    mc.createDummyStateMemento(`create${name}`);
    mc.createDummyStateMemento(`delete${name}`);
}
for (const name of ["Buffer", "Texture", "RenderBuffer", "FrameBuffer"]) {
    mc.createDummyStateMemento(`create${name}`);
    mc.createDummyStateMemento(`delete${name}`);
}

export default class StateMachine {

    constructor(openGL) {
        this.openGL = openGL;
        this.state = Object.create(null);
        mc.applyStateMementos(this);
    }
}
