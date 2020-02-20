import AbstractType from "./AbstractType";

export default class ScalarType extends AbstractType {

    constructor(options) {
        super(options);
    }

    get isScalar() {
        return true;
    }

    get isGeneric() {
        return false;
    }

    write(dataView, destinationByteOffset, value) {
        this.dataViewSetterMethod.call(dataView, destinationByteOffset, value, true);
    };

    read(dataView, sourceByteOffset) {
        return this.dataViewGetterMethod.call(dataView, sourceByteOffset, true);
    };
}
