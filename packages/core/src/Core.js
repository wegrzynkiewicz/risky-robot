import Action from "./action/Action";
import ActionRepository from "./action/ActionRepository";
import BinaryDescriptor from "./binary/BinaryDescriptor";
import binaryTypeRegistry from "./binary/binaryTypeRegistry";
import Bundle from "./bundle/Bundle";
import ChunkConstructorBuilder from "./world/ChunkConstructorBuilder";
import Color from "./graphic/Color";
import NoiseGenerator from "./noise/NoiseGenerator";
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
Core.ChunkConstructorBuilder = ChunkConstructorBuilder;
Core.Color = Color;
Core.NoiseGenerator = NoiseGenerator;
Core.WebGLRenderingContext = WebGLRenderingContext;
