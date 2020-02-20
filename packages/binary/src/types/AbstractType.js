import typeSymbol from "./typeSymbol";
import typedArrays from "./typedArrays";

export default class AbstractType {

    constructor({name, byteLength, components, openGLTypeName, arrayTypeName, dataViewTypeName}) {
        this.name = name;
        this.components = components;
        this.byteLength = byteLength;
        this.openGLType = openGLTypeName ? WebGL2RenderingContext[openGLTypeName] : null;
        this.openGLTypeName = openGLTypeName ? openGLTypeName : null;
        this.arrayTypeName = arrayTypeName ? arrayTypeName : null;
        this.arrayTypeConstructor = arrayTypeName ? typedArrays[arrayTypeName] : null;
        this.dataViewTypeName = dataViewTypeName;
        this.dataViewGetterMethod = DataView.prototype[`get${dataViewTypeName}`];
        this.dataViewSetterMethod = DataView.prototype[`set${dataViewTypeName}`];
    }

    get isStructure() {
        return false;
    }

    get [typeSymbol]() {
        return true;
    }

    getTypedArray(dataView, offset) {
        const arrayBuffer = dataView.buffer;
        const byteOffset = dataView.byteOffset + offset;
        const elementsCount = this.components;
        const typedArray = new this.arrayTypeConstructor(
            arrayBuffer,
            byteOffset,
            elementsCount
        );

        return typedArray;
    }

    createTypedArray(count = 0) {
        return new this.arrayTypeConstructor(this.components * count);
    };
}
