import Stage from "../Stage";

export default class LoadingStage extends Stage {

    constructor() {
        super();
        this.name = "init";
    }

    async init(previousStage, app) {
        const rootElement = document.getElementById("root");
        // rootElement.innerHTML = "loading";
        return super.init(previousStage, app);
    }

    processKeyboard(event, app) {
        return true;
    }

    processMouse(event, app) {
        return true;
    }

}
