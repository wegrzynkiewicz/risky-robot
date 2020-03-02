import UniformBuffer from '../buffer/UniformBuffer';

export default class UniformBufferManager {

    constructor({view}) {
        this.view = view;
        this.uniformBuffersMap = new Map();
    }

    createUniformBuffer({name, usage}) {
        const {view} = this;
        const uniformBuffer = new UniformBuffer({name, usage, view});
        this.uniformBuffersMap.set(name, uniformBuffer);
        return uniformBuffer;
    }
}
