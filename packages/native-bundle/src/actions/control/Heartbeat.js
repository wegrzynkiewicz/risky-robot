import Action from "../../../../core/src/logic/actions/Action";
import BinaryDescriptor from "../../../../core/src/binary/BinaryDescriptor";

export default class Heartbeat {}

Action.bind(Heartbeat, {
    code: 0x0001,
    name: "heartbeat",
    type: "binary",
});

BinaryDescriptor.bind(Heartbeat, {
    properties: [],
});
