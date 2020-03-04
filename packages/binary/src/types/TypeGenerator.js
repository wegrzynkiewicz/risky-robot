import GenericType from './GenericType';
import ScalarType from './ScalarType';

const openGLIntegerMapper = [
    {
        arrayTypePrefix: '',
        openGLTypeName: 'BYTE',
        power: 0,
    },
    {
        arrayTypePrefix: '',
        openGLTypeName: 'SHORT',
        power: 1,
    },
    {
        arrayTypePrefix: '',
        openGLTypeName: 'INT',
        power: 2,
    },
    {
        arrayTypePrefix: 'Big',
        openGLTypeName: null,
        power: 3,
    },
];

const openGLFloatMapper = [
    {
        openGLTypeName: 'FLOAT',
        power: 2,
    },
    {
        openGLTypeName: null,
        power: 3,
    },
];

export default class TypeGenerator {

    constructor(binaryTypes) {
        this.binaryTypes = binaryTypes;
        this.staticTypes = [];
    }

    generate() {
        this.generateStatic();
        this.generateGeneric();
        this.generateStd140();
    }

    generateStd140() {
        for (let vectorWidth = 2; vectorWidth <= 4; vectorWidth++) {
            for (const axisTypeName of ['f32', 's32', 'u32']) {
                this.createGenericType({
                    axisLength: 4,
                    axisType: this.binaryTypes.getTypeByName(axisTypeName),
                    prefix: 'std140_vec',
                    width: vectorWidth,
                });
            }
        }

        for (let matrixWidth = 2; matrixWidth <= 4; matrixWidth++) {
            for (const axisTypeName of ['f32', 's32', 'u32']) {
                this.createGenericType({
                    axisLength: matrixWidth * 4,
                    axisType: this.binaryTypes.getTypeByName(axisTypeName),
                    prefix: 'std140_mat',
                    width: matrixWidth,
                });
            }
        }
    }

    generateGeneric() {
        for (let vectorWidth = 2; vectorWidth <= 4; vectorWidth++) {
            for (const axisType of this.staticTypes) {
                this.createGenericType({
                    axisLength: vectorWidth,
                    axisType,
                    prefix: 'vec',
                    width: vectorWidth,
                });
            }
        }

        for (let matrixWidth = 2; matrixWidth <= 4; matrixWidth++) {
            for (const axisType of this.staticTypes) {
                this.createGenericType({
                    axisLength: matrixWidth ** 2,
                    axisType,
                    prefix: 'mat',
                    width: matrixWidth,
                });
            }
        }
    }

    generateStatic() {
        for (const {power, openGLTypeName, arrayTypePrefix} of openGLIntegerMapper) {
            this.createStaticType({
                arrayType: `${arrayTypePrefix}Int`,
                char: 's',
                openGLTypeName,
                power,
            });
            this.createStaticType({
                arrayType: `${arrayTypePrefix}Uint`,
                char: 'u',
                openGLTypeName: openGLTypeName === null ? null : `UNSIGNED_${openGLTypeName}`,
                power,
            });
        }

        for (const {power, openGLTypeName} of openGLFloatMapper) {
            this.createStaticType({
                arrayType: 'Float',
                char: 'f',
                openGLTypeName,
                power,
            });
        }
    }

    createStaticType({char, power, openGLTypeName, arrayType}) {
        const byteLength = 2 ** power;
        const bitSize = byteLength * 8;
        const name = `${char}${bitSize}`;
        const dataViewTypeName = `${arrayType}${bitSize}`;

        const type = new ScalarType({
            arrayTypeName: `${arrayType}${bitSize}Array`,
            axisLength: 1,
            byteLength,
            dataViewTypeName,
            name,
            openGLTypeName,
        });

        this.binaryTypes.registerType(type);
        this.staticTypes.push(type);
    }

    createGenericType({prefix, width, axisLength, axisType}) {
        const name = `${prefix}${width}<${axisType.name}>`;
        const byteLength = axisLength * axisType.byteLength;

        const type = new GenericType({
            arrayTypeName: axisType.arrayTypeName,
            axisLength,
            axisType,
            byteLength,
            dataViewTypeName: axisType.dataViewTypeName,
            name,
            openGLTypeName: axisType.openGLTypeName,
        });

        this.binaryTypes.registerType(type);
    }
}
