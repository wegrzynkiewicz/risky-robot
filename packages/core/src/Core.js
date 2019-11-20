import Action from "./action/Action";
import ActionRepository from "./action/ActionRepository";
import BinaryDescriptor from "./binary/BinaryDescriptor";
import binaryTypeRegistry from "./binary/binaryTypeRegistry";
import Bundle from "./bundle/Bundle";
import Color from "./graphic/Color";
import WebGLRenderingContext from "./graphic/WebGLRenderingContext";

export default class Core {

    constructor() {
        this.actionRegistry = new ActionRepository();
    }
};

Core.Action = Action;
Core.BinaryDescriptor = BinaryDescriptor;
Core.binaryTypeRegistry = binaryTypeRegistry;
Core.Bundle = Bundle;
Core.Color = Color;
Core.WebGLRenderingContext = WebGLRenderingContext;
