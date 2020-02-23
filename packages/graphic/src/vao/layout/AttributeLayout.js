import * as Binary from "robo24-binary";

export default class AttributeLayout {

    constructor({name, type, divisor, location, normalize, byteStride, byteOffset}) {
        this.name = name;
        this.type = type;
        this.divisor = divisor;
        this.location = location;
        this.normalize = normalize;
        this.byteStride = byteStride;
        this.byteOffset = byteOffset;
    }

    createAccessor({dataView, count}) {
        return new Binary.TypeListAccessor({
            count: count,
            type: this.type,
            dataView: dataView,
            byteOffset: this.byteOffset,
            byteStride: this.byteStride,
        });
    }

    bindAttributeLocation(view) {
        if (this.type.openGLType === WebGL2RenderingContext['FLOAT'] || this.normalize) {
            view.openGL.vertexAttribPointer(
                this.location,
                this.type.axisLength,
                this.type.openGLType,
                this.normalize,
                this.byteStride,
                this.byteOffset
            );
        } else {
            view.openGL.vertexAttribIPointer(
                this.location,
                this.type.axisLength,
                this.type.openGLType,
                this.byteStride,
                this.byteOffset
            );
        }

        // TODO: add default attribute value

        view.openGL.vertexAttribDivisor(
            this.location,
            this.divisor
        );
    }
}
