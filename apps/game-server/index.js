import WebSocket from "ws";
import messageRegistry from "../../lib/network/communication/messageRegistry.js";
import Heartbeat from "../../lib/network/communication/messages/control/Heartbeat";
import MessageSerializer from "../../lib/network/communication/serialization/MessageSerializer";

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
            command: "positions",
            players
        }));
    }
};

const messageSerializer = new MessageSerializer(messageRegistry);

webSocketServer.on('connection', function connection(ws) {
    connections.push(ws);
    ws.on('message', function (data) {
        try {
            const message = messageSerializer.deserialize(data);
            console.log(message);
        } catch (error) {
            console.error(error);
        }
    });
    let i = 0;
    setInterval(() => {
        const message = messageSerializer.serialize(new Heartbeat());
        ws.send(message);
        i++;
    }, 1000);
});
