import typedArrays from "./typedArrays";

const binaryTypeSymbol = Symbol("BinaryType");

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

const createTypedArray = function (elementsCount) {
    return new this.arrayType(this.components * elementsCount);
};

const openGLIntegerMapper = [
    {power: 0, openGLType: "BYTE", arrayTypePrefix: ""},
    {power: 1, openGLType: "SHORT", arrayTypePrefix: ""},
    {power: 2, openGLType: "INT", arrayTypePrefix: ""},
    {power: 3, openGLType: undefined, arrayTypePrefix: "Big"},
];

const openGLFloatMapper = [
    {power: 2, openGLType: "FLOAT"},
    {power: 3, openGLType: undefined},
];

const staticTypes = [];

class BinaryTypes {

    constructor() {
        this.types = Object.create(null);

        for (let {power, openGLType, arrayTypePrefix} of openGLIntegerMapper) {
            this.createStaticType({
                char: "s",
                power,
                openGLType,
                arrayType: `${arrayTypePrefix}Int`
            });
            this.createStaticType({
                char: "u",
                power,
                openGLType: `UNSIGNED_${openGLType}`,
                arrayType: `${arrayTypePrefix}Uint`
            });
        }

        for (let {power, openGLType} of openGLFloatMapper) {
            this.createStaticType({
                char: "f",
                power,
                openGLType,
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

    createStaticType({char, power, openGLType, arrayType}) {
        const byteLength = 2 ** power;
        const bitSize = byteLength * 8;
        const typeName = `${char}${bitSize}`;
        const dataViewType = `${arrayType}${bitSize}`;

        const instance = createInstance();

        instance.scalar = true;
        instance.generic = false;
        instance.typeName = typeName;
        instance.byteLength = byteLength;
        instance.components = 1;
        instance.axisType = null;
        instance.axisLength = 0;
        instance.axisByteLength = 0;
        instance.openGLType = WebGL2RenderingContext[openGLType];
        instance.openGLTypeName = openGLType;
        instance.openGLTypeStride = byteLength;
        instance.arrayType = typedArrays[`${arrayType}${bitSize}Array`];
        instance.dataViewGetter = DataView.prototype[`get${dataViewType}`];
        instance.dataViewSetter = DataView.prototype[`set${dataViewType}`];
        instance[binaryTypeSymbol] = true;
        instance.write = writeStatic;
        instance.read = readStatic;
        instance.createTypedArray = createTypedArray;

        this.types[typeName] = instance;
        staticTypes.push(instance);
    }

    createGenericType({prefix, width, axisLength, staticType}) {
        const genericTypeName = `${prefix}${width}<${staticType.typeName}>`;
        const genericByteLength = axisLength * staticType.byteLength;

        const instance = createInstance();

        instance.scalar = false;
        instance.generic = true;
        instance.typeName = genericTypeName;
        instance.byteLength = genericByteLength;
        instance.components = axisLength;
        instance.axisType = staticType;
        instance.axisLength = axisLength;
        instance.axisByteLength = staticType.byteLength;
        instance.openGLType = staticType.openGLType;
        instance.openGLTypeName = staticType.openGLTypeName;
        instance.openGLTypeStride = staticType.openGLTypeStride;
        instance.arrayType = staticType.arrayType;
        instance.dataViewGetter = staticType.dataViewGetter;
        instance.dataViewSetter = staticType.dataViewSetter;
        instance[binaryTypeSymbol] = true;
        instance.write = writeGeneric;
        instance.read = readGeneric;
        instance.createTypedArray = createTypedArray;

        this.types[genericTypeName] = instance;
    }

    resolve(type) {
        if (typeof type === "string") {
            return this.getTypeByName(type);
        }

        if (type[binaryTypeSymbol] === true) {
            return type;
        }

        throw new Error("Cannot resolve type.");
    }

    getTypeByName(typeName) {
        const type = this.types[typeName];
        if (type === undefined) {
            throw new Error(`Not found type named (${typeName})`);
        }
        return this.types[typeName];
    }
}

const binaryTypes = new BinaryTypes();

export default binaryTypes;
