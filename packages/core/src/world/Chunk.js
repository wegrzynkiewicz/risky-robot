export default class Chunk {

    constructor() {
        this.data = null;
    }

    dispose() {
        if (this.data !== null) {
            this.data.dispose();
            this.data = null;
        }
    }
}
