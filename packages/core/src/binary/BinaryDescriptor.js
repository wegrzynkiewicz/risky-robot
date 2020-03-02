import typeRegistry from './binaryTypeRegistry';

const regex = new RegExp('(?<mainType>\\w+)(?:<(?<subType>\\w+)>)?(?:\\[(?<count>\\w*)\\])?');

export default class BinaryDescriptor {

    constructor(options) {
        this.properties = [];
        this.context = {
            offset: 0,
        };

        for (let propertyDeclaration of options.properties) {
            this.createProperty(propertyDeclaration);
        }
    }

    createProperty(propertyDeclaration) {
        const {property, type} = propertyDeclaration;
        const match = regex.exec(type);
        const {mainType, subType, count} = match.groups;
        const typeKey = `${mainType}` + (subType ? `<${subType}>` : '');
        const typeConstructor = typeRegistry.getTypeByName(typeKey);

        const typeInstance = new typeConstructor({
            propertyName: property,
            byteOffset: this.context.offset,
        });

        this.context.offset += typeInstance.getByteLength();
        this.properties.push(typeInstance);
    }

    getTotalByteSize(instance) {
        let sum = 0;
        for (let property of this.properties) {
            sum += property.getByteLength(instance);
        }
        return sum;
    }

    encode(dataView, instance) {
        for (let property of this.properties) {
            property.encode(dataView, instance);
        }
    }

    decode(dataView, instance) {
        for (let property of this.properties) {
            property.decode(dataView, instance);
        }
    }

    static bind(constructor, options) {
        const binaryDescriptor = new BinaryDescriptor(options);
        constructor.prototype[BinaryDescriptor.symbol] = binaryDescriptor;
        return binaryDescriptor;
    }
}

BinaryDescriptor.symbol = Symbol('BinaryDescriptor');
