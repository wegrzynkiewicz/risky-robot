import typeRegistry from "./typeRegistry";
import binaryDescriptorSymbol from "./binaryDescriptorSymbol";

const regex = new RegExp(`(?<mainType>\\w+)(?:<(?<subType>\\w+)>)?(?:\\[(?<count>\\w*)\\])?`);

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
            property,
            byteOffset: this.context.offset,
        });

        this.context.offset += typeInstance.byteSize;
        this.properties.push(typeInstance);
    }

    getTotalByteSize(instance) {
        let sum = 0;
        for (let property of this.properties) {
            sum += property.getByteSize(instance);
        }
        return sum;
    }

    encode(dataView, instance) {
        for (let property of this.properties) {
            property.encode(dataView, instance);
        }
    }

    static bind(constructor, options) {
        const binaryDescriptor = new BinaryDescriptor(options);
        constructor.prototype[binaryDescriptorSymbol] = binaryDescriptor;
        return binaryDescriptor;
    }
}
