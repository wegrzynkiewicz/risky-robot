import Action from '../../../action/Action';
import MessageJSONSerializer from './MessageJSONSerializer';
import MessageBinarySerializer from './MessageBinarySerializer';

export default class MessageSerializer {

    /**
     * @param {ActionRepository} messageRepository
     */
    constructor(messageRepository) {
        this.types = Object.create(null);
        this.types['json'] = new MessageJSONSerializer(messageRepository);
        this.types['binary'] = new MessageBinarySerializer(messageRepository);
    }

    serialize(message) {
        const type = message.action[Action.symbol].type;
        const serializer = this.types[type];
        if (!serializer) {
            throw new Error('Invalid message type');
        }
        const serializedData = serializer.serialize(message);
        return serializedData;
    }

    deserialize(encodedData) {
        const type = typeof encodedData === 'string' ? 'json' : 'binary';
        const message = this.types[type].deserialize(encodedData);
        return message;
    }
}
