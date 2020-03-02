export default class Keyboard {

    constructor() {
        this.pressed = new Map();

        window.document.addEventListener('keydown', (event) => {
            this.pressed[event.key] = true;
        });

        window.document.addEventListener('keyup', (event) => {
            this.pressed[event.key] = false;
        });
    }
}
