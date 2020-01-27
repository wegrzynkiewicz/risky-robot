import ImageData from "./ImageData";

export default class CanvasRenderingContext2D {

    constructor(canvas) {
        this.canvas = canvas;
    }

    drawImage() {
        if (arguments.length === 5) {
            this.canvas.width = arguments[3];
            this.canvas.height = arguments[4];
        } else if (arguments.length === 9) {
            this.canvas.width = arguments[7];
            this.canvas.height = arguments[8];
        }
    }

    getImageData() {
        return new ImageData(
            new Array(this.canvas.width * this.canvas.height * 4),
            this.canvas.width,
            this.canvas.height);
    }
}
