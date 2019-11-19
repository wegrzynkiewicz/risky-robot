import webGLRenderingContext from "../graphic/webGLRenderingContext";

const glIntegerMapper = [
    {power: 0, glType: "BYTE"},
    {power: 1, glType: "SHORT"},
    {power: 2, glType: "INT"},
];

const glFloatMapper = [
    {power: 2, glType: "FLOAT"},
];

const vertexAttributeTypes = new class AttributeTypeRegistry {

    constructor() {
        this.types = {};
        const staticTypes = [];

        for (let {power, glType} of glIntegerMapper) {
            staticTypes.push(this.createStaticType("s", power, glType));
            staticTypes.push(this.createStaticType("u", power, `UNSIGNED_${glType}`));
        }

        for (let {power, glType} of glFloatMapper) {
            staticTypes.push(this.createStaticType("f", power, glType));
        }

        for (let vectorWidth = 2; vectorWidth <= 4; vectorWidth++) {
            for (let staticType of Object.values(staticTypes)) {
                this.createVectorType('vec', vectorWidth, staticType)
            }
        }
    }

    createStaticType(char, power, gtType) {
        const type = {};
        const byteLength = 2 ** power;
        const bitSize = 8 * byteLength;
        const typeName = `${char}${bitSize}`;
        Object.defineProperty(type, 'typeName', {value: typeName});
        Object.defineProperty(type, 'components', {value: 1});
        Object.defineProperty(type, 'byteLength', {value: byteLength});
        Object.defineProperty(type, 'glType', {value: webGLRenderingContext[gtType]});
        Object.defineProperty(type, 'glTypeName', {value: gtType});
        this.types[typeName] = type;

        return type;
    }

    createVectorType(prefix, width, staticType) {
        const type = {};
        const vectorTypeName = `${prefix}${width}<${staticType.typeName}>`;
        const vectorByteLength = width * staticType.byteLength;
        Object.defineProperty(type, 'typeName', {value: vectorTypeName});
        Object.defineProperty(type, 'components', {value: width});
        Object.defineProperty(type, 'byteLength', {value: vectorByteLength});
        Object.defineProperty(type, 'glType', {value: staticType.glType});
        Object.defineProperty(type, 'glTypeName', {value: staticType.glTypeName});
        this.types[vectorTypeName] = type;
    }

    getTypeByName(typeName) {
        const type = this.types[typeName];
        if (type === undefined) {
            throw new Error(`Not found type named (${typeName})`);
        }
        return this.types[typeName];
    }
};

export default vertexAttributeTypes;
