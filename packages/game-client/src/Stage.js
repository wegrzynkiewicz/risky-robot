import EventEmitter from './helpers/EventEmitter'

export default class Stage extends EventEmitter {

    constructor(options) {
        super();
        Object.assign(this, options);
    }

    async close(nextStage, app, args) {
        this.emit('close', nextStage, app, args);
    }

    async init(previousStage, app, args) {
        this.emit('init', previousStage, app, args);
    }

    processKeyboard(event) {
        throw new Error('Not implemented');
    }
}
