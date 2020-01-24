import Binary from "robo24-binary";

export default class AttributeLayout {

    constructor({name, type, divisor, normalize, byteStride, byteOffset}) {
        this.name = name;
        this.type = type;
        this.divisor = divisor;
        this.normalize = normalize;
        this.byteStride = byteStride;
        this.byteOffset = byteOffset;
    }

    getAccessor() {
        return new Binary.Accessor({
            type: this.type,
            byteOffset: this.byteOffset,
            byteStride: this.byteStride,
        });
    }

    bindAttributeLocationPointer(openGL, attributeLocationPointer) {
        const {components, openGLType} = this.type;
        if (openGLType === openGL.FLOAT || this.normalize) {
            openGL.vertexAttribPointer(
                attributeLocationPointer,
                components,
                openGLType,
                this.normalize,
                this.byteStride,
                this.byteOffset
            );
        } else {
            openGL.vertexAttribIPointer(
                attributeLocationPointer,
                components,
                openGLType,
                this.byteStride,
                this.byteOffset
            );
        }

        // TODO: add default attribute value

        openGL.vertexAttribDivisor(
            attributeLocationPointer,
            this.divisor
        );
    }
}
