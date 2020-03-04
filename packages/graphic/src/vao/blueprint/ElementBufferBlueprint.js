import * as Binary from 'robo24-binary';
import ElementBufferLayout from '../layout/ElementBufferLayout';

export default class ElementBufferBlueprint {

    constructor({name}) {
        this.name = name;
        this.type = Binary.types.resolve('u16');
    }

    createBufferLayout({allocation}) {
        const bufferLayout = new ElementBufferLayout({
            byteLength: this.calculateTotalByteLength(allocation),
            byteOffset: 0,
            name: this.name,
            type: this.type,
        });

        return bufferLayout;
    }

    calculateTotalByteLength({indicesCount}) {
        return indicesCount * this.type.byteLength;
    }
}
