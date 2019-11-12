import Action from "../../logic/actions/Action";
import BinaryDescriptor from "../../binary/BinaryDescriptor";

export default class Message {

    constructor({code, id, action}) {
        this.code = code ? code : 0;
        this.id = id ? id : 0;
        this.action = action;
    }

    static createFromAction(action) {
        const {code} = action[Action.symbol];
        if (!code) {
            throw new Error("Cannot create message object");
        }
        const message = new Message({code, action});
        return message;
    }
}

BinaryDescriptor.bind(Message, {
    properties: [
        {type: "u16", property: "code"},
        {type: "u16", property: "id"},
    ],
});

