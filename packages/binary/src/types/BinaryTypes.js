import typedArrays from "./typedArrays";

const createInstance = function () {
    const creator = new Function(`return {};`);
    return creator();
};

const writeGeneric = function (dataView, offset, source) {
    for (let i = 0; i < this.axisLength; i++) {
        const subOffset = offset + (i * this.axisByteLength);
        this.dataViewSetter.call(dataView, subOffset, source[i], true);
    }
};

const readGeneric = function (dataView, offset, destination) {
    for (let i = 0; i < this.axisLength; i++) {
        const subOffset = offset + (i * this.axisByteLength);
        const value = this.dataViewGetter.call(dataView, subOffset, true);
        destination[i] = value;
    }
    return destination;
};

const writeStatic = function (dataView, offset, value) {
    this.dataViewSetter.call(dataView, offset, value, true);
};

const readStatic = function (dataView, offset) {
    return this.dataViewGetter.call(dataView, offset, true);
};

const glIntegerMapper = [
    {power: 0, glType: "BYTE", arrayTypePrefix: ""},
    {power: 1, glType: "SHORT", arrayTypePrefix: ""},
    {power: 2, glType: "INT", arrayTypePrefix: ""},
    {power: 3, glType: undefined, arrayTypePrefix: "Big"},
];

const glFloatMapper = [
    {power: 2, glType: "FLOAT"},
    {power: 3, glType: undefined},
];

const staticTypes = [];

export default class BinaryTypes {

    constructor() {
        this.types = Object.create(null);

        for (let {power, glType, arrayTypePrefix} of glIntegerMapper) {
            this.createStaticType({
                char: "s",
                power,
                glType,
                arrayType: `${arrayTypePrefix}Int`
            });
            this.createStaticType({
                char: "u",
                power,
                glType: `UNSIGNED_${glType}`,
                arrayType: `${arrayTypePrefix}Uint`
            });
        }

        for (let {power, glType} of glFloatMapper) {
            this.createStaticType({
                char: "f",
                power,
                glType,
                arrayType: "Float"
            });
        }

        for (let vectorWidth = 2; vectorWidth <= 4; vectorWidth++) {
            for (let staticType of staticTypes) {
                this.createGenericType({
                    prefix: 'vec',
                    width: vectorWidth,
                    axisLength: vectorWidth,
                    staticType,
                });
            }
        }

        for (let matrixWidth = 2; matrixWidth <= 4; matrixWidth++) {
            for (let staticType of staticTypes) {
                this.createGenericType({
                    prefix: 'mat',
                    width: matrixWidth,
                    axisLength: matrixWidth ** 2,
                    staticType,
                });
            }
        }
    }

    createStaticType({char, power, glType, arrayType}) {
        const byteLength = 2 ** power;
        const bitSize = byteLength * 8;
        const typeName = `${char}${bitSize}`;
        const dataViewType = `${arrayType}${bitSize}`;

        const instance = createInstance();

        instance.typeName = typeName;
        instance.byteLength = byteLength;
        instance.components = 1;
        instance.glType = WebGLRenderingContext[glType];
        instance.glTypeName = glType;
        instance.glTypeStride = byteLength;
        instance.arrayType = typedArrays[`${arrayType}${bitSize}Array`];
        instance.dataViewGetter = DataView.prototype[`get${dataViewType}`];
        instance.dataViewSetter = DataView.prototype[`set${dataViewType}`];
        instance.write = writeStatic;
        instance.read = readStatic;

        this.types[typeName] = instance;
        staticTypes.push(instance);
    }

    createGenericType({prefix, width, axisLength, staticType}) {
        const genericTypeName = `${prefix}${width}<${staticType.typeName}>`;
        const genericByteLength = axisLength * staticType.byteLength;

        const instance = createInstance();

        instance.typeName = genericTypeName;
        instance.byteLength = genericByteLength;
        instance.components = axisLength;
        instance.axisType = staticType;
        instance.axisLength = axisLength;
        instance.axisByteLength = staticType.byteLength;
        instance.glType = staticType.glType;
        instance.glTypeName = staticType.glTypeName;
        instance.glTypeStride = staticType.glTypeStride;
        instance.arrayType = staticType.arrayType;
        instance.dataViewGetter = staticType.dataViewGetter;
        instance.dataViewSetter = staticType.dataViewSetter;
        instance.write = writeGeneric;
        instance.read = readGeneric;

        this.types[genericTypeName] = instance;
    }

    getTypeByName(typeName) {
        const type = this.types[typeName];
        if (type === undefined) {
            throw new Error(`Not found type named (${typeName})`);
        }
        return this.types[typeName];
    }
}
