import TypeAccessor from '../access/TypeAccessor';
import TypeListAccessor from '../access/TypeListAccessor';
import typedArrays from './typedArrays';

export default class AbstractType {

    constructor({name, byteLength, axisLength, openGLTypeName, arrayTypeName, dataViewTypeName}) {
        this.name = name;
        this.axisLength = axisLength;
        this.byteLength = byteLength;

        this.openGLType = openGLTypeName ? WebGL2RenderingContext[openGLTypeName] : null;
        this.openGLTypeName = openGLTypeName ? openGLTypeName : null;
        this.arrayTypeName = arrayTypeName ? arrayTypeName : null;
        this.ArrayType = arrayTypeName ? typedArrays[arrayTypeName] : null;
        this.dataViewTypeName = dataViewTypeName;
        this.dataViewGetterMethod = DataView.prototype[`get${dataViewTypeName}`];
        this.dataViewSetterMethod = DataView.prototype[`set${dataViewTypeName}`];
    }

    createAccessor({dataView, byteOffset}) {
        return new TypeAccessor({
            byteOffset,
            dataView,
            type: this,
        });
    }

    createListAccessor({dataView, count, byteOffset, byteStride}) {
        return new TypeListAccessor({
            byteOffset,
            byteStride,
            count,
            dataView,
            type: this,
        });
    }

    createDataView() {
        const buffer = new ArrayBuffer(this.byteLength);
        const dataView = new DataView(buffer);

        return dataView;
    }

    createTypedArray(count) {
        return new this.ArrayType(this.axisLength * count);
    }
}
