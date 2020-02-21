import createBasicLayout from "./createBasicLayout";

export default class VAOLayout {

    constructor({allocation}) {
        this.allocation = allocation;
        this.bufferLayoutMap = new Map();
    }

    getBufferLayout(bufferName) {
        return this.bufferLayoutMap.get(bufferName);
    }
}

VAOLayout.createBasicLayout = createBasicLayout;
