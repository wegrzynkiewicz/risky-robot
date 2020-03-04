import ImageData from './ImageData';

const BYTES_PER_COLOR = 4;

export default class CanvasRenderingContext2D {

    constructor(canvas) {
        this.canvas = canvas;
    }

    drawImage(...args) {
        const {canvas} = this;
        if (args.length === 5) {
            canvas.width = args[3];
            canvas.height = args[4];
        } else if (args.length === 9) {
            canvas.width = args[7];
            canvas.height = args[8];
        }
    }

    getImageData() {
        const {height, width} = this.canvas;
        return new ImageData(
            new Array(width * height * BYTES_PER_COLOR),
            width,
            height,
        );
    }
}
