import Action from "./action/Action";
import ActionRepository from "./action/ActionRepository";
import Bundle from "./bundle/Bundle";
import BinaryDescriptor from "./binary/BinaryDescriptor";
import binaryTypeRegistry from "./binary/binaryTypeRegistry";

export default class Core {

    constructor() {
        this.actionRegistry = new ActionRepository();
    }
};

Core.Action = Action;
Core.Bundle = Bundle;
Core.BinaryDescriptor = BinaryDescriptor;
Core.binaryTypeRegistry = binaryTypeRegistry;
