/* eslint-disable class-methods-use-this */

import enumerable from './enumerable';
import extensions from './extensions';
import functionNames from './functionNames';

export default class WebGLRenderingContext {

    constructor(canvas) {
        this.canvas = canvas;
        this.drawingBufferWidth = canvas.width;
        this.drawingBufferHeight = canvas.height;
    }

    getExtension(ext) {
        return extensions[ext];
    }
}

for (const func of functionNames) {
    WebGLRenderingContext.prototype[func] = () => ({});
}

for (const key of Object.keys(enumerable)) {
    WebGLRenderingContext.prototype[key] = enumerable[key];
    WebGLRenderingContext[key] = enumerable[key];
}
