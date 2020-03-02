import AbstractType from './AbstractType';

export default class GenericType extends AbstractType {

    constructor({axisType, ...options}) {
        super(options);
        this.axisType = axisType;
    }

    write(dataView, destinationByteOffset, sourceTypedArray, sourceByteOffset = 0) {
        const destinationTypedArray = new this.arrayTypeConstructor(
            dataView.buffer,
            dataView.byteOffset + destinationByteOffset,
            this.axisLength,
        );
        destinationTypedArray.set(sourceTypedArray, sourceByteOffset);
    };

    read(dataView, sourceByteOffset, destinationTypedArray, destinationByteOffset = 0) {
        const sourceTypedArray = new this.arrayTypeConstructor(
            dataView.buffer,
            dataView.byteOffset + sourceByteOffset,
            this.axisLength,
        );
        destinationTypedArray.set(sourceTypedArray, destinationByteOffset);
        return destinationTypedArray;
    };
}
