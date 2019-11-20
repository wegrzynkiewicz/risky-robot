import WebGLRenderingContext from "../graphic/WebGLRenderingContext";

const createConstructor = function () {
    return function (options) {
        Object.assign(this, options);
    };
};

const typedArrays = {
    "Int8Array": Int8Array,
    "Uint8Array": Uint8Array,
    "Uint8ClampedArray": Uint8ClampedArray,
    "Int16Array": Int16Array,
    "Uint16Array": Uint16Array,
    "Int32Array": Int32Array,
    "Uint32Array": Uint32Array,
    "Float32Array": Float32Array,
    "Float64Array": Float64Array,
};

const encodeGeneric = function (dataView, instance) {
    const value = instance[this.propertyName];
    if (!value instanceof this.arrayType) {
        throw new Error(
            `Cannot encode property named (${this.propertyName}) is not (${this.arrayType.name}) type`
        );
    }

    const typedArrayLength = value.length;
    for (let i = 0; i < typedArrayLength; i++) {
        this.dataViewSetter.call(dataView, this.byteOffset + (this.axisByteLength * i), value[i], true);
    }
};

const decodeGeneric = function (dataView, instance) {
    const start = dataView.byteOffset + this.byteOffset;
    const end = start + this.byteLength;
    const arrayBufferFragment = dataView.buffer.slice(start, end);
    const arrayTypeConstructor = this.arrayType;
    const arrayType = new arrayTypeConstructor(arrayBufferFragment);
    instance[this.propertyName] = arrayType;
};

const writeGeneric = function (dataView, offset, value) {
    for (let i = 0; i < this.axisLength; i++) {
        const subOffset = offset + (i * this.axisByteLength);
        this.dataViewSetter.call(dataView, subOffset, value[i], true);
    }
};

const readGeneric = function (dataView, offset) {
    const arrayType = new (this.arrayType)(this.axisLength);
    for (let i = 0; i < this.axisLength; i++) {
        const subOffset = offset + (i * this.axisByteLength);
        const value = this.dataViewGetter.call(dataView, subOffset, true);
        arrayType[i] = value;
    }
};

const decodeStatic = function (dataView, instance) {
    const value = this.dataViewGetter.call(dataView, this.byteOffset, true);
    instance[this.propertyName] = value;
};

const encodeStatic = function (dataView, instance) {
    const value = instance[this.propertyName];
    return this.dataViewSetter.call(dataView, this.byteOffset, value, true);
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
    {power: 0, glType: "BYTE"},
    {power: 1, glType: "SHORT"},
    {power: 2, glType: "INT"},
    {power: 3, glType: undefined},
];

const glFloatMapper = [
    {power: 2, glType: "FLOAT"},
    {power: 3, glType: undefined},
];

const staticTypes = [];

const binaryTypeRegistry = new class TypeRegistry {

    constructor() {
        this.types = {};

        for (let {power, glType} of glIntegerMapper) {
            this.createStaticType({
                char: "s",
                power, glType,
                arrayType: "Int"
            });
            this.createStaticType({
                char: "u",
                power,
                glType: `UNSIGNED_${glType}`,
                arrayType: "Uint"
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
                this.createGenericType('vec', vectorWidth, vectorWidth, staticType)
            }
        }

        for (let matrixWidth = 2; matrixWidth <= 4; matrixWidth++) {
            for (let staticType of staticTypes) {
                this.createGenericType("mat", matrixWidth, matrixWidth ** 2, staticType)
            }
        }
    }

    createStaticType({char, power, glType, arrayType}) {
        const byteLength = 2 ** power;
        const bitSize = byteLength * 8;
        const typeName = `${char}${bitSize}`;
        const dataViewType = `${arrayType}${bitSize}`;

        const constructor = createConstructor();
        const {prototype} = constructor;

        Object.defineProperties(prototype, {
            'typeName': {value: typeName},
            'byteLength': {value: byteLength},

            'components': {value: 1},
            'glType': {value: WebGLRenderingContext[glType]},
            'glTypeName': {value: glType},

            'arrayType': {value: typedArrays[`${arrayType}${bitSize}Array`]},
            'dataViewGetter': {value: DataView.prototype[`get${dataViewType}`]},
            'dataViewSetter': {value: DataView.prototype[`set${dataViewType}`]},

            'encode': {value: encodeStatic},
            'decode': {value: decodeStatic},
            'write': {value: writeStatic},
            'read': {value: readStatic},
            'getByteLength': {value: getByteLength},
        });

        this.types[typeName] = constructor;
        staticTypes.push(constructor);
    }

    createGenericType(prefix, width, axisLength, staticType) {
        const genericTypeName = `${prefix}${width}<${staticType.prototype.typeName}>`;
        const genericByteLength = axisLength * staticType.prototype.byteLength;

        const constructor = createConstructor();
        const {prototype} = constructor;

        Object.defineProperties(prototype, {
            'typeName': {value: genericTypeName},
            'byteLength': {value: genericByteLength},

            'axisType': {value: staticType},
            'axisLength': {value: axisLength},
            'axisByteLength': {value: staticType.prototype.byteLength},

            'components': {value: axisLength},
            'glType': {value: staticType.prototype.glType},
            'glTypeName': {value: staticType.prototype.glTypeName},

            'arrayType': {value: staticType.prototype.arrayType},
            'dataViewGetter': {value: staticType.prototype.dataViewGetter},
            'dataViewSetter': {value: staticType.prototype.dataViewSetter},

            'encode': {value: encodeGeneric},
            'decode': {value: decodeGeneric},
            'write': {value: writeGeneric},
            'read': {value: readGeneric},
            'getByteLength': {value: getByteLength},
        });

        this.types[genericTypeName] = constructor;
    }

    getTypeByName(typeName) {
        const type = this.types[typeName];
        if (type === undefined) {
            throw new Error(`Not found type named (${typeName})`);
        }
        return this.types[typeName];
    }
};

export default binaryTypeRegistry;
