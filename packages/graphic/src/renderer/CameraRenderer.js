import {Matrix4} from "../math";

export default class CameraRenderer {

    constructor() {
        this.viewMatrix = Matrix4.create();
        this.projectionMatrix = Matrix4.create();
    }
}
