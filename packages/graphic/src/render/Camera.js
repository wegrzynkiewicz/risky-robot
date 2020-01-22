import {Matrix4} from "../math";

export default class Camera {

    constructor() {
        this.viewMatrix = Matrix4.create();
        this.projectionMatrix = Matrix4.create();
    }
}
