import {Matrix4} from "../math";
import SceneNode from "./SceneNode"

export default class ModelSceneNode extends SceneNode {

    constructor({name, model}) {
        super({name});
        this.model = model;
        this.modelMatrix = Matrix4.create();
    }

    shouldRender(system, context) {
        // TODO: frustum culling
        context.renderingOrder.add(this);
        super.shouldRender(system, context);
    }

    render(system, context) {

    }
}
