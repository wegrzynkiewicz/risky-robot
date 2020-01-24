const bufferType = {
    "array": {
        openGLBufferType: WebGLRenderingContext["ARRAY_BUFFER"],
        openGLBufferTypeName: "ARRAY_BUFFER",
    },
    "element": {
        openGLBufferType: WebGLRenderingContext["ELEMENT_ARRAY_BUFFER"],
        openGLBufferTypeName: "ELEMENT_ARRAY_BUFFER",
    },
};

export default class OpenGLBuffer {

    constructor({openGL, name, type, bufferLayout}) {
        const {openGLBufferType, openGLBufferTypeName} = bufferType[type];

        if (openGLBufferTypeName === undefined) {
            throw new Error("Invalid  allocation primitive type.");
        }

        this.name = name;
        this.openGL = openGL;
        this.openGLBufferPointer = openGL.createBuffer();
        this.openGLBufferType = openGLBufferType;
        this.openGLBufferTypeName = openGLBufferTypeName;
        this.bufferLayout = bufferLayout;

        if (process.env.INSPECTOR_METADATA_ENABLED && false) {
            attachBufferInspectorData.call();
        }
    }

    bind() {
        this.openGL.bindBuffer(this.openGLBufferType, this.openGLBufferPointer);
    }

    unbind() {
        this.openGL.bindBuffer(this.openGLBufferType, null);
    }

    setDataView(dataView) {
        this.bind();
        this.openGL.bufferData(this.openGLBufferType, dataView, this.openGL.STATIC_DRAW);
    }
}

function attachBufferInspectorData() {
    buffer.openGLBufferPointer.__SPECTOR_Object_TAG.displayText += "; name:" + buffer.name;
    openGLVAOPointer.__SPECTOR_Metadata = {
        "Allocation": allocation,
        ...bufferAllocations
    };
}

