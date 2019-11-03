import messageSymbol from "../../messageSymbol";

export default class Heartbeat {}

Heartbeat.prototype[messageSymbol] = {
    code: 0x01,
    name: "heartbeat",
    type: "binary",
    properties: [
        {type: "u8", property: "type"},
        {type: "u8[8]", property: "blockBitWidth"},
    ],
};
