let bufferId = 0;

export default class AbstractBuffer {

    constructor({view, name, usage}) {
        this.name = name;
        this.view = view;
        this.usage = usage;
        this.bufferId = bufferId++;
        this.openGLBufferPointer = view.openGL.createBuffer();
    }

    bind() {
        this.view.stateMachine.bindBuffer(this.openGLBufferType, this.openGLBufferPointer);
    }

    unbind() {
        this.view.stateMachine.bindBuffer(this.openGLBufferType, null);
    }

    setBufferData(data) {
        this.bind();
        this.view.openGL.bufferData(
            this.openGLBufferType,
            data,
            this.usage,
        );
    }
}
