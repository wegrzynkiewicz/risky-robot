import WebSocket from 'ws';
import MessageSerializer from '../../lib/network/communication/serialization/MessageSerializer';
import actionRegistry from '../../lib/logic/actions/actionRegistry';
import Heartbeat from '../../lib/actions/control/Heartbeat';
import Message from '../../lib/network/communication/Message';

const webSocketServer = new WebSocket.Server({
    port: 8080,
    perMessageDeflate: {
        zlibDeflateOptions: {
            chunkSize: 1024,
            memLevel: 7,
            level: 3
        },
        zlibInflateOptions: {
            chunkSize: 10 * 1024
        },
        clientNoContextTakeover: true,
        serverNoContextTakeover: true,
        serverMaxWindowBits: 10,
        concurrencyLimit: 10,
        threshold: 1024
    }
});

let players = [];

let c = 0;

let connections = [];

const send = function () {
    for (let con of connections) {
        con.send(JSON.stringify({
            command: 'positions',
            players
        }));
    }
};

const messageSerializer = new MessageSerializer(actionRegistry);

webSocketServer.on('connection', function connection(ws) {
    connections.push(ws);
    ws.on('message', function (data) {
        try {
            const message = messageSerializer.deserialize(data);
        } catch (error) {
            console.error(error);
        }
    });
    let i = 0;
    setInterval(() => {
        const message = Message.createFromAction(new Heartbeat());
        const data = messageSerializer.serialize(message);
        ws.send(data);
        i++;
    }, 1000);
});
