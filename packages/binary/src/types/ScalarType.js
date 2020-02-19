import AbstractType from "./AbstractType";

export default class ScalarType extends AbstractType {

    constructor(options) {
        super(options);
    }

    get static() {
        return true;
    }

    get generic() {
        return false;
    }

    write(dataView, destinationByteOffset, value) {
        this.dataViewSetterMethod.call(dataView, destinationByteOffset, value, true);
    };

    read(dataView, sourceByteOffset) {
        return this.dataViewGetterMethod.call(dataView, sourceByteOffset, true);
    };
}
