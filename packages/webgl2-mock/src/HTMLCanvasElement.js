import CanvasRenderingContext2D from "./CanvasRenderingContext2D";
import WebGLRenderingContext from "./WebGLRenderingContext";

export default class HTMLCanvasElement {

    constructor(width, height) {
        this.width = width !== undefined ? width : 100;
        this.height = height !== undefined ? height : 100;
    }

    getContext(arg) {
        switch (arg) {
            case '2d':
                return new CanvasRenderingContext2D(this);
            case 'webgl':
            case 'experimental-webgl':
                return new WebGLRenderingContext(this);
        }
        return null;
    };
}

