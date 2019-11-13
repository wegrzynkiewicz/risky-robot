import Core from "robo24-core";

export default class Heartbeat {}

Core.Action.bind(Heartbeat, {
    code: 0x0001,
    name: "heartbeat",
    type: "binary",
});

Core.BinaryDescriptor.bind(Heartbeat, {
    properties: [],
});
