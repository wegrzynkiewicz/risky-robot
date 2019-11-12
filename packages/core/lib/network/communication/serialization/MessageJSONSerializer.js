import Message from "../Message";

export default class MessageJSONSerializer {

    constructor(actionRepository) {
        this.actionRepository = actionRepository;
    }

    serialize(message) {
        const object = {
            "name": this.actionRepository.getNameByCode(message.code),
            "id": message.id,
            "data": message.action,
        };
        const json = JSON.stringify(object);
        return json;
    }

    deserialize(data) {
        const object = JSON.parse(data);
        const {name: messageName, id, data: actionContent} = object;

        if (messageName === undefined) {
            throw new Error("Cannot deserialize");
        }

        const code = this.actionRepository.getCodeByName(messageName);
        const message = new Message({id, code});
        const actionConstructor = this.actionRepository.getConstructorByName(messageName);
        message.action = new actionConstructor(actionContent);

        return message;
    }
}
