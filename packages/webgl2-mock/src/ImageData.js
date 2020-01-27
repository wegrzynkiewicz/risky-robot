export default class ImageData {

    constructor() {
        switch (arguments.length) {
            case 2:
                this.width = arguments[0];
                this.height = arguments[1];
                break;
            case 3:
                this.data = new Uint8ClampedArray(arguments[0]);
                this.width = arguments[1];
                this.height = arguments[2];
                break;
        }
    }
}

