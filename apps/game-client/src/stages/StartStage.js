import Stage from "../Stage";
import start from "../../templates/start.html";

export default class StartStage extends Stage {

    constructor() {
        super();
        this.name = "start";
    }

    init(previousStage, app) {
        const rootElement = document.getElementById("root");
        // rootElement.innerHTML = start;
    }

    processKeyboard(event, app) {
        return true;
    }

    processMouse(event, app) {
        return true;
    }

}
