import ScalarType from "./ScalarType";
import GenericType from "./GenericType";

const openGLIntegerMapper = [
    {power: 0, openGLTypeName: "BYTE", arrayTypePrefix: ""},
    {power: 1, openGLTypeName: "SHORT", arrayTypePrefix: ""},
    {power: 2, openGLTypeName: "INT", arrayTypePrefix: ""},
    {power: 3, openGLTypeName: undefined, arrayTypePrefix: "Big"},
];

const openGLFloatMapper = [
    {power: 2, openGLTypeName: "FLOAT"},
    {power: 3, openGLTypeName: undefined},
];

export default class TypeGenerator {

    constructor(binaryTypes) {
        this.binaryTypes = binaryTypes;
        this.staticTypes = [];
    }

    generate() {
        for (let {power, openGLTypeName, arrayTypePrefix} of openGLIntegerMapper) {
            this.createStaticType({
                char: "s",
                power,
                openGLTypeName,
                arrayType: `${arrayTypePrefix}Int`
            });
            this.createStaticType({
                char: "u",
                power,
                openGLTypeName: `UNSIGNED_${openGLTypeName}`,
                arrayType: `${arrayTypePrefix}Uint`
            });
        }

        for (let {power, openGLTypeName} of openGLFloatMapper) {
            this.createStaticType({
                char: "f",
                power,
                openGLTypeName,
                arrayType: "Float"
            });
        }

        for (let vectorWidth = 2; vectorWidth <= 4; vectorWidth++) {
            for (let axisType of this.staticTypes) {
                this.createGenericType({
                    prefix: 'vec',
                    width: vectorWidth,
                    axisLength: vectorWidth,
                    axisType,
                });
            }
        }

        for (let matrixWidth = 2; matrixWidth <= 4; matrixWidth++) {
            for (let axisType of this.staticTypes) {
                this.createGenericType({
                    prefix: 'mat',
                    width: matrixWidth,
                    axisLength: matrixWidth ** 2,
                    axisType,
                });
            }
        }
    }

    createStaticType({char, power, openGLTypeName, arrayType}) {
        const byteLength = 2 ** power;
        const bitSize = byteLength * 8;
        const name = `${char}${bitSize}`;
        const dataViewTypeName = `${arrayType}${bitSize}`;

        const type = new ScalarType({
            name,
            byteLength,
            axisLength: 1,
            openGLTypeName,
            arrayTypeName: `${arrayType}${bitSize}Array`,
            dataViewTypeName,
        });

        this.binaryTypes.registerType(type);
        this.staticTypes.push(type);
    }

    createGenericType({prefix, width, axisLength, axisType}) {
        const name = `${prefix}${width}<${axisType.name}>`;
        const byteLength = axisLength * axisType.byteLength;

        const type = new GenericType({
            name,
            axisType,
            byteLength,
            axisLength,
            openGLTypeName: axisType.openGLTypeName,
            arrayTypeName: axisType.arrayTypeName,
            dataViewTypeName: axisType.dataViewTypeName,
        });

        this.binaryTypes.registerType(type);
    }
}
