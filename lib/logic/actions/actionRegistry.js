import ActionRepository from "./ActionRepository";
import Introduce from "../../actions/control/Introduce";
import Heartbeat from "../../actions/control/Heartbeat";
import Move from "../../actions/player/Move";

const actionRegistry = new ActionRepository();

actionRegistry.register(Introduce);
actionRegistry.register(Heartbeat);

actionRegistry.register(Move);

export default actionRegistry;
