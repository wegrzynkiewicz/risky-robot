import * as Binary from "robo24-binary";

export default class ElementBufferLayout {

    constructor({name, type, byteOffset, byteLength}) {
        this.name = name;
        this.type = type;
        this.byteOffset = byteOffset;
        this.byteLength = byteLength;
        this.openGLBufferType = WebGL2RenderingContext['ELEMENT_ARRAY_BUFFER'];
    }

    createAccessor({dataView, count}) {
        return new Binary.Accessor({
            count: count,
            type: this.type,
            dataView: dataView,
            byteOffset: this.byteOffset,
            byteStride: this.type.byteLength,
        });
    }

    createDataView() {
        const buffer = new ArrayBuffer(this.byteLength);
        const dataView = new DataView(buffer);

        return dataView;
    }
}
