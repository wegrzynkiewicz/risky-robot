import actionSymbol from "../../logic/actions/actionSymbol";
import BinaryDescriptor from "../../binary/BinaryDescriptor";

export class Message {
    
    constructor(action) {
        const {code} = action[actionSymbol];
        if (!code) {
            throw new Error("Cannot create message object");
        }
        this.code = code;
        this.id = 0x0000;
        this.action = action;
    }
}

BinaryDescriptor.bind(Message, {
    properties: [
        {type: "u16", property: "code"},
        {type: "u16", property: "id"},
        {type: "obj", property: "action"},
    ],
});

