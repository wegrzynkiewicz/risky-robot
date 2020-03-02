import assert from 'assert';
import MessageBinarySerializer from '../../../../core/src/network/communication/serialization/MessageBinarySerializer';
import Heartbeat from '../../../src/actions/control/Heartbeat';
import Message from '../../../../core/src/network/communication/Message';

const messageRegistryMock = {
    getConstructorByCode: code => Heartbeat,
};
const serializer = new MessageBinarySerializer(messageRegistryMock);

describe('Heartbeat', function () {

    it('serialize', function () {
        const heartbeat = Message.createFromAction(new Heartbeat());
        const arrayBuffer = serializer.serialize(heartbeat);

        assert.strictEqual(arrayBuffer.byteLength, 4);
    });

    it('deserialize', function () {
        const arrayBuffer = new ArrayBuffer(4);
        const dataView = new DataView(arrayBuffer);
        dataView.setUint16(0, 0x0001, true);
        dataView.setUint16(0, 0x0004, true);

        const heartbeat = serializer.deserialize(arrayBuffer);

        assert(heartbeat instanceof Message);
        assert(heartbeat.action instanceof Heartbeat);
    });
});
