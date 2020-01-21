import EventEmitter from "events"

export default class Loop extends EventEmitter {

    constructor({window}) {
        super();
        this.window = window;
        this.requestID = null;
        this.previousTimestampSeconds = 0;
        this.loop = this.loop.bind(this);
    }

    start() {
        this.requestID = this.window.requestAnimationFrame(this.loop);
    }

    stop() {
        if (this.requestID) {
            this.window.cancelAnimationFrame(this.requestID);
        }
    }

    loop(currentTimestamp) {
        const currentTimestampSeconds = currentTimestamp * 0.001;
        const deltaTime = currentTimestampSeconds - this.previousTimestampSeconds;
        this.previousTimestampSeconds = currentTimestampSeconds;

        if (deltaTime !== 0.0) {
            this.emit("frame", deltaTime);
            this.requestID = this.window.requestAnimationFrame(this.loop);
        }
    }
}
