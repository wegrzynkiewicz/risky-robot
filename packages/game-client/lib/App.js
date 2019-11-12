import InitStage from "./stages/InitStages";
import StartStage from "./stages/StartStage";
import GameStage from "./stages/GameStage";
import LoadingStage from "./stages/LoadingStage";
import EventEmitter from "./helpers/EventEmitter";
import Game from "./Game";

export default class App extends EventEmitter {

    constructor() {
        super();
        this.stages = {
            init: new InitStage(),
            start: new StartStage(),
            loading: new LoadingStage(),
            game: new GameStage(),
        };
        this.setCurrentStage('init').then();
    }

    async setCurrentStage(stageName, args) {
        console.log("stage", stageName);
        const stage = this.stages[stageName];
        const previousStage = this.currentStage;
        const nextStage = stage;
        if (previousStage) {
            await previousStage.close(nextStage, this, args);
        }
        await nextStage.init(previousStage, this, args);
        this.currentStage = nextStage;
    }

    inputKeyboard(event) {
        this.currentStage.processKeyboard(event, this);
    }

    inputMouse(event) {
        this.currentStage.processMouse(event, this);
    }

    registerListeners() {
        document.addEventListener("keypress", this.inputKeyboard.bind(this));
        document.addEventListener("keydown", this.inputKeyboard.bind(this));
        document.addEventListener("keyup", this.inputKeyboard.bind(this));
        document.addEventListener("mousemove", this.inputMouse.bind(this));
    }

    async initialize() {
        await this.registerListeners();
        this.emit('ready');
    }
}
