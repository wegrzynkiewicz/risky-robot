export default class ImageData {

    constructor(...args) {
        switch (args.length) {
            case 2:
                this.width = args[0];
                this.height = args[1];
                break;
            case 3:
                this.data = new Uint8ClampedArray(args[0]);
                this.width = args[1];
                this.height = args[2];
                break;
            default:
                throw new Error('DomainError');
        }
    }
}

