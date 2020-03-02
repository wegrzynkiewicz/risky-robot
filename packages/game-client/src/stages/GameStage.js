import Stage from '../Stage';
import Game from '../Game';

export default class GameStage extends Stage {

    constructor() {
        super();
        this.game = new Game();
        this.name = 'game';
    }

    async init(previousStage, app, {game_id}) {
        const rootElement = document.getElementById('root');
        // rootElement.innerHTML = "";
        // rootElement.prepend(this.game.canvas.element);
        await this.game.init();
        this.game.loop();
    }

    processKeyboard(event, app) {
        this.game.processKeyboard(event, app);
    }

    processMouse(event, app) {
        this.game.processMouse (event, app);
    }

}
