import * as Binary from 'risky-robot-binary';

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
            byteOffset: this.byteOffset,
            byteStride: this.byteStride,
            count,
            dataView,
            type: this.type,
        });
    }

    bindAttributeLocation(view) {
        if (this.type.openGLType === WebGL2RenderingContext.FLOAT || this.normalize) {
            view.openGL.vertexAttribPointer(
                this.location,
                this.type.axisLength,
                this.type.openGLType,
                this.normalize,
                this.byteStride,
                this.byteOffset,
            );
        } else {
            view.openGL.vertexAttribIPointer(
                this.location,
                this.type.axisLength,
                this.type.openGLType,
                this.byteStride,
                this.byteOffset,
            );
        }

        // TODO: add default attribute value

        view.openGL.vertexAttribDivisor(
            this.location,
            this.divisor,
        );
    }
}
