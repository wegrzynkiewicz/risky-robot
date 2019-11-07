import Message from "../../Message";

export default class Heartbeat {}

Message.bind(Heartbeat, {
    code: 0x0001,
    name: "heartbeat",
    type: "binary",
    descriptor: {
        properties: [],
    }
});
