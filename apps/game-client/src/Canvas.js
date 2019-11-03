export default class Canvas {
    constructor() {
        this.element = window.document.getElementById('game');
        this.openGL = this.element.getContext('webgl2');

        if (!this.openGL) {
            throw new Error('Unable to initialize WebGL. Your browser or machine may not support it.');
        }
    }
}
