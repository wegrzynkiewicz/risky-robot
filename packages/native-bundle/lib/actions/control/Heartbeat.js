import Action from "../../../../core/lib/logic/actions/Action";
import BinaryDescriptor from "../../../../core/lib/binary/BinaryDescriptor";

export default class Heartbeat {}

Action.bind(Heartbeat, {
    code: 0x0001,
    name: "heartbeat",
    type: "binary",
});

BinaryDescriptor.bind(Heartbeat, {
    properties: [],
});
