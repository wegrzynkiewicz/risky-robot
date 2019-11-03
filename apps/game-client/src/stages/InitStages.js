import Stage from "../Stage";

export default class InitStage extends Stage {

    constructor() {
        super();
        this.name = "init";
    }

    processKeyboard(event, app) {
        return true;
    }

    processMouse(event, app) {
        return true;
    }

}
