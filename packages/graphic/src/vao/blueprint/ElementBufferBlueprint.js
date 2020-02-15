import * as Binary from "robo24-binary";
import ElementBufferLayout from "../layout/ElementBufferLayout";

export default class ElementBufferBlueprint {

    constructor({name}) {
        this.name = name;
        this.type = Binary.types.getTypeByName("u16");
    }

    createBufferLayout({allocation}) {
        const bufferLayout = new ElementBufferLayout({
            name: this.name,
            type: this.type,
            byteOffset: 0,
            byteLength: this.calculateTotalByteLength(allocation)
        });

        return bufferLayout;
    }

    calculateTotalByteLength({indicesCount}) {
        return indicesCount * this.type.byteLength;
    }
}
