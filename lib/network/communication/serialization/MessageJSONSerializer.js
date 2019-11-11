const messageNameField = "@code";

export default class MessageJSONSerializer {

    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }

    serialize(message) {
        const {name} = message[messageSymbol];
        const object = {
            [messageNameField]: name
        };
        Object.assign(object, message);
        const json = JSON.stringify(object);
        return json;
    }

    deserialize(data) {
        const object = JSON.parse(data);
        const {[messageNameField]: messageName, ...content} = object;
        if (messageName === undefined) {
            throw new Error("Cannot deserialize");
        }
        const constructor = this.messageRepository.getConstructorByName(messageName);
        const message = new constructor(content);
        return message;
    }
}
