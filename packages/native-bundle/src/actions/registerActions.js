import Heartbeat from "./control/Heartbeat";
import Introduce from "./control/Introduce";
import Move from "./player/Move";

export default function registerActions (registry) {
    registry.register(Heartbeat);
    registry.register(Introduce);
    registry.register(Move);
}
