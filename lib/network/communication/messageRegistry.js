import MessageRepository from "./MessageRepository";

import Introduce from "./messages/control/Introduce";
import Heartbeat from "./messages/control/Heartbeat";

import Move from "./messages/action/Move";

const messageRegistry = new MessageRepository();

messageRegistry.register(Introduce);
messageRegistry.register(Heartbeat);

messageRegistry.register(Move);

export default messageRegistry;
