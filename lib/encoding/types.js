const regex = new RegExp(`(?<mainType>\\w+)(?:<(?<subType>\\w+)>)?(?:\\[(?<count>\\w*)\\])?`);

const vectorAxes = [
    ["x", "y"],
    ["x", "y", "z"],
    ["x", "y", "z", "w"],
];

const BinaryDescriptor = new class BinaryDescriptor {

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
            return function (offset) {
                this.offset = offset;
            };
        })();

        const {prototype} = constructor;

        Object.defineProperty(prototype, 'typeName', {value: typeName});
        Object.defineProperty(prototype, 'byteSize', {value: byteSize});
        Object.defineProperty(prototype, 'getterDataViewTypeName', {value: `get${dataViewType}`});
        Object.defineProperty(prototype, 'setterDataViewTypeName', {value: `set${dataViewType}`});

        prototype.get = function (object) {
            return object['dataView'][this['getterDataViewTypeName']](this.offset);
        };
        prototype.set = function (object, value) {
            return object['dataView'][this['setterDataViewTypeName']](this.offset, value);
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
            return function (offset) {
                this.offset = offset;
                this.length = length;
            };
        })(vectorLength);

        const {prototype} = constructor;

        Object.defineProperty(prototype, 'typeName', {value: vectorTypeName});
        Object.defineProperty(prototype, 'byteSize', {value: vectorByteSize});
        Object.defineProperty(prototype, 'axisType', {value: staticType});

        for (let [axisOffset, field] of axis.entries()) {
            const offset = staticByteSize * axisOffset;
            const staticProperty = new staticType(offset);
            prototype[field] = staticProperty;
            prototype[axisOffset] = staticProperty;
        }

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
            return function (offset) {
                this.offset = offset;
                this.length = length;
            };
        })(matrixElements);

        const {prototype} = constructor;

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

    register(constructor, config) {
        const {prototype} = constructor;
        const context = {
            prototype,
            offset: 0
        };
        for (let propertyDeclaration of config.properties) {
            //const property = this.createProperty(context, propertyDeclaration);
        }
    }

    createProperty(context, propertyDeclaration) {
        const {type} = propertyDeclaration;
        const match = regex.exec(type);
        const {mainType, subType, count} = match.groups;
        const typeKey = `${mainType}` + (subType ? `<${subType}>` : '');
        const typeDefinition = this.types[typeKey];

        if (count === "") {
            return new DynamicArrayProperty({
                name: propertyDeclaration.name,
            });
        }

        const parsedCount = parseInt(count);

        if (!isNaN(parsedCount)) {
            return new StaticArrayProperty({
                length: parsedCount,
            })
        }

        const {define, size} = property.type;
        const descriptor = define(property, offset);

        if (size !== undefined && offset !== undefined) {
            offset += size;
        } else {
            offset = undefined;
        }

        Object.defineProperty(prototype, property.name, descriptor);
    }

    parseProperty(propertyDeclaration) {
        const {type} = propertyDeclaration;
        const match = regex.exec(type);
        const {mainType, subType, count} = match.groups;
        const typeDefinition = this.types[typeKey];

        if (typeDefinition === undefined) {
            throw new Error(`Type (${type}) not exists`);
        }

        const {property: propertyName, ...others} = propertyDeclaration;

        return {
            name: propertyName,
            ...others,
            type: {
                ...typeDefinition
            },
        };
    }
};

export default BinaryDescriptor;

console.log(BinaryDescriptor);
