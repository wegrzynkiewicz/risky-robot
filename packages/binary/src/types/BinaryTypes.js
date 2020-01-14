import typedArrays from "./typedArrays";

const createConstructor = function (name) {
    const creator = new Function(`return class ${name} {}`);
    return creator();
};

const writeGeneric = function (dataView, offset, value) {
    for (let i = 0; i < this.axisLength; i++) {
        const subOffset = offset + (i * this.axisByteLength);
        this.dataViewSetter.call(dataView, subOffset, value[i], true);
    }
};

const readGeneric = function (dataView, offset, destination) {
    for (let i = 0; i < this.axisLength; i++) {
        const subOffset = offset + (i * this.axisByteLength);
        const value = this.dataViewGetter.call(dataView, subOffset, true);
        destination[i] = value;
    }
};

const writeStatic = function (dataView, offset, value) {
    this.dataViewSetter.call(dataView, offset, value, true);
};

const readStatic = function (dataView, offset) {
    this.dataViewGetter.call(dataView, offset, true);
};

const getByteLength = function () {
    return this.byteLength;
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
        this.types = {};

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
                    name: `Vector`,
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
                    name: `Matrix`,
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

        const className = `${arrayType}${bitSize}`;
        const constructor = createConstructor(className);
        const {prototype} = constructor;

        prototype.typeName = typeName;
        prototype.byteLength = byteLength;
        prototype.components = 1;
        prototype.glType = WebGLRenderingContext[glType];
        prototype.glTypeName = glType;
        prototype.glTypeStride = byteLength;
        prototype.arrayType = typedArrays[`${arrayType}${bitSize}Array`];
        prototype.dataViewGetter = DataView.prototype[`get${dataViewType}`];
        prototype.dataViewSetter = DataView.prototype[`set${dataViewType}`];
        prototype.write = writeStatic;
        prototype.read = readStatic;
        prototype.getByteLength = getByteLength;

        this.types[typeName] = constructor;
        staticTypes.push(constructor);
    }

    createGenericType({name, prefix, width, axisLength, staticType}) {
        const genericTypeName = `${prefix}${width}<${staticType.prototype.typeName}>`;
        const genericByteLength = axisLength * staticType.prototype.byteLength;

        const className = `${name}${width}_of_${staticType.prototype.constructor.name}`;
        const constructor = createConstructor(className);
        const {prototype} = constructor;

        prototype.typeName = genericTypeName;
        prototype.byteLength = genericByteLength;
        prototype.components = axisLength;
        prototype.axisType = staticType;
        prototype.axisLength = axisLength;
        prototype.axisByteLength = staticType.prototype.byteLength;
        prototype.glType = staticType.prototype.glType;
        prototype.glTypeName = staticType.prototype.glTypeName;
        prototype.glTypeStride = staticType.prototype.glTypeStride;
        prototype.arrayType = staticType.prototype.arrayType;
        prototype.dataViewGetter = staticType.prototype.dataViewGetter;
        prototype.dataViewSetter = staticType.prototype.dataViewSetter;
        prototype.write = writeGeneric;
        prototype.read = readGeneric;
        prototype.getByteLength = getByteLength;

        this.types[genericTypeName] = constructor;
    }

    getTypeByName(typeName) {
        const type = this.types[typeName];
        if (type === undefined) {
            throw new Error(`Not found type named (${typeName})`);
        }
        return this.types[typeName];
    }
}
