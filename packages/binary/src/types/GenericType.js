import AbstractType from "./AbstractType";

export default class GenericType extends AbstractType {

    constructor({axisType, ...options}) {
        super(options);
        this.axisType = axisType;
    }

    get isScalar() {
        return false;
    }

    get isGeneric() {
        return true;
    }

    write(dataView, destinationByteOffset, sourceTypedArray, sourceByteOffset = 0) {
        const destination = this.getTypedArray(dataView, destinationByteOffset);
        destination.set(sourceTypedArray, sourceByteOffset);
    };

    read(dataView, sourceByteOffset, destinationTypedArray, destinationByteOffset = 0) {
        const sourceTypedArray = this.getTypedArray(dataView, sourceByteOffset);
        destinationTypedArray.set(sourceTypedArray, destinationByteOffset);
        return destinationTypedArray;
    };
}
