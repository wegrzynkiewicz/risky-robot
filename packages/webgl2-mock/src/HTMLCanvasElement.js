import CanvasRenderingContext2D from './CanvasRenderingContext2D';
import WebGLRenderingContext from './WebGLRenderingContext';

export default class HTMLCanvasElement {

    constructor(width, height) {
        this.width = width === undefined ? 100 : width;
        this.height = height === undefined ? 100 : height;
    }

    getContext(arg) {
        switch (arg) {
            case '2d':
                return new CanvasRenderingContext2D(this);
            case 'webgl':
            case 'webgl2':
            case 'experimental-webgl':
                return new WebGLRenderingContext(this);
            default:
                throw new Error('DomainError');
        }
    }
}
