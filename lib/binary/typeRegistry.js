const vectorAxes = [
    ["x", "y"],
    ["x", "y", "z"],
    ["x", "y", "z", "w"],
];

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
        const byteSize = 2 ** power;
        const bitSize = byteSize * 8;
        const typeName = `${char}${bitSize}`;
        const dataViewType = `${mapped}${bitSize}`;

        const constructor = (function () {
            return function (options) {
                Object.assign(this, options);
            };
        })();

        const {prototype} = constructor;

        prototype.getByteSize = function () {
            return this.byteSize;
        };

        Object.defineProperty(prototype, 'typeName', {value: typeName});
        Object.defineProperty(prototype, 'byteSize', {value: byteSize});
        Object.defineProperty(prototype, 'arrayType', {value: `${mapped}${bitSize}Array`});
        Object.defineProperty(prototype, 'getterDataViewTypeName', {value: `get${dataViewType}`});
        Object.defineProperty(prototype, 'setterDataViewTypeName', {value: `set${dataViewType}`});

        prototype.decode = function (dataView) {
            return dataView[this['getterDataViewTypeName']](this.offset);
        };

        prototype.encode = function (dataView, value) {
            return dataView[this['setterDataViewTypeName']](this.offset, value);
        };

        this.staticTypes[typeName] = constructor;
        this.types[typeName] = constructor;
    }

    createVectorTypes() {
        for (let axis of vectorAxes) {
            for (let staticType of Object.values(this.staticTypes)) {
                this.createVectorType(axis, staticType)
            }
        }
    }

    createVectorType(axis, staticType) {
        const {typeName: staticTypeName, byteSize: staticByteSize} = staticType.prototype;
        const vectorLength = axis.length;
        const vectorTypeName = `vec${vectorLength}<${staticTypeName}>`;
        const vectorByteSize = vectorLength * staticByteSize;

        const constructor = (function (length) {
            return function (options) {
                Object.assign(this, options);
                this.length = length;
            };
        })(vectorLength);

        const {prototype} = constructor;

        prototype.getByteSize = function () {
            return this.byteSize;
        };

        Object.defineProperty(prototype, 'typeName', {value: vectorTypeName});
        Object.defineProperty(prototype, 'byteSize', {value: vectorByteSize});
        Object.defineProperty(prototype, 'axisType', {value: staticType});

        prototype.decode = function (dataView) {
            const newDataView = dataView.slice(this.offset, this.byteSize);
            const arrayTypeConstructor = this["axisType"]["arrayType"];
            return new arrayTypeConstructor(newDataView);
        };

        prototype.encode = function (dataView, value) {
            const arrayTypeConstructor = this["axisType"]["arrayType"];
            const arrayType = new arrayTypeConstructor(dataView.buffer, this.offset, this.offset * this.byteSize);
            arrayType.set(value);
        };

        this.types[vectorTypeName] = constructor;
    }

    createMatrixTypes() {
        for (let matrixWidth = 2; matrixWidth <= 4; matrixWidth++) {
            for (let staticTypes of Object.values(this.staticTypes)) {
                this.createMatrixType(matrixWidth, staticTypes);
            }
        }
    }

    createMatrixType(matrixWidth, staticType) {
        const {typeName: staticTypeName, byteSize: staticByteSize} = staticType.prototype;
        const matrixTypeName = `mat${matrixWidth}<${staticTypeName}>`;
        const matrixElements = (matrixWidth ** 2);
        const matrixByteSize = matrixElements * staticByteSize;

        const constructor = (function (length) {
            return function (options) {
                Object.assign(this, options);
                this.length = length;
            };
        })(matrixElements);

        const {prototype} = constructor;

        prototype.getByteSize = function () {
            return this.byteSize;
        };

        Object.defineProperty(prototype, 'typeName', {value: matrixTypeName});
        Object.defineProperty(prototype, 'byteSize', {value: matrixByteSize});
        Object.defineProperty(prototype, 'axisType', {value: staticType});

        for (let i = 0; i < matrixElements; i++) {
            const offset = staticByteSize * i;
            const staticProperty = new staticType(offset);
            prototype[i] = staticProperty;
        }

        this.types[matrixTypeName] = constructor;
    }

    getTypeByName(typeName) {
        const type = this.types[typeName];
        if (type === undefined) {
            throw new Error(`Not found type named (${typeName})`);
        }
        return this.types[typeName];
    }
}
