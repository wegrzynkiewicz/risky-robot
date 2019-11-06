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

const decodeStatic = function (dataView, instance) {
    const value = this.dataViewGetter.call(dataView, this.byteOffset, true);
    instance[this.propertyName] = value;
};

const encodeStatic = function (dataView, instance) {
    const value = instance[this.propertyName];
    return this.dataViewSetter.call(dataView, this.byteOffset, value, true);
};

const getByteLength = function () {
    return this.byteLength;
};

export default new class TypeRegistry {

    constructor() {
        this.types = {};
        this.staticTypes = {};
        this.createStaticTypes();
        this.createVectorTypes();
        this.createMatrixTypes();
    }

    createStaticTypes() {
        for (let power of [0, 1, 2, 3]) {
            this.createStaticType("s", power, "Int");
            this.createStaticType("u", power, "Uint");
        }
        for (let power of [2, 3]) {
            this.createStaticType("f", power, "Float");
        }
    }

    createStaticType(char, power, mapped) {
        const byteLength = 2 ** power;
        const bitSize = byteLength * 8;
        const typeName = `${char}${bitSize}`;
        const dataViewType = `${mapped}${bitSize}`;

        const constructor = createConstructor();
        const {prototype} = constructor;

        Object.defineProperty(prototype, 'typeName', {value: typeName});
        Object.defineProperty(prototype, 'byteLength', {value: byteLength});

        Object.defineProperty(prototype, 'arrayType', {value: typedArrays[`${mapped}${bitSize}Array`]});
        Object.defineProperty(prototype, 'dataViewGetter', {value: DataView.prototype[`get${dataViewType}`]});
        Object.defineProperty(prototype, 'dataViewSetter', {value: DataView.prototype[`set${dataViewType}`]});

        prototype.encode = encodeStatic;
        prototype.decode = decodeStatic;
        prototype.getByteLength = getByteLength;

        this.staticTypes[typeName] = constructor;
        this.types[typeName] = constructor;
    }

    createVectorTypes() {
        for (let vectorWidth = 2; vectorWidth <= 4; vectorWidth++) {
            for (let staticType of Object.values(this.staticTypes)) {
                this.createGenericType('vec', vectorWidth, vectorWidth, staticType)
            }
        }
    }

    createMatrixTypes() {
        for (let matrixWidth = 2; matrixWidth <= 4; matrixWidth++) {
            for (let staticType of Object.values(this.staticTypes)) {
                this.createGenericType("mat", matrixWidth, matrixWidth ** 2, staticType)
            }
        }
    }

    createGenericType(prefix, width, axisLength, staticType) {
        const {typeName: staticTypeName, byteLength: staticByteLength} = staticType.prototype;
        const genericTypeName = `${prefix}${width}<${staticTypeName}>`;
        const genericByteLength = axisLength * staticByteLength;

        const constructor = createConstructor();
        const {prototype} = constructor;

        Object.defineProperty(prototype, 'typeName', {value: genericTypeName});
        Object.defineProperty(prototype, 'byteLength', {value: genericByteLength});

        Object.defineProperty(prototype, 'axisType', {value: staticType});
        Object.defineProperty(prototype, 'axisLength', {value: axisLength});
        Object.defineProperty(prototype, 'axisByteLength', {value: staticByteLength});

        Object.defineProperty(prototype, 'arrayType', {value: staticType.prototype['arrayType']});
        Object.defineProperty(prototype, 'dataViewGetter', {value: staticType.prototype[`dataViewGetter`]});
        Object.defineProperty(prototype, 'dataViewSetter', {value: staticType.prototype[`dataViewSetter`]});

        prototype.decode = decodeGeneric;
        prototype.encode = encodeGeneric;
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
