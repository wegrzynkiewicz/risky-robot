import CanvasRenderingContext2D from "./CanvasRenderingContext2D";
import HTMLCanvasElement from "./HTMLCanvasElement";
import ImageData from "./ImageData";
import Image from "./Image";
import WebGLRenderingContext from "./WebGLRenderingContext";

const emptyCallback = function () {
    return undefined;
};

export function registerGlobals() {
    // canvas
    global.HTMLCanvasElement = HTMLCanvasElement;
    global.CanvasRenderingContext2D = CanvasRenderingContext2D;
    global.ImageData = ImageData;
    global.Image = Image;
    global.HTMLImageElement = Image;
    global.HTMLVideoElement = Image;

    // WebGL 1.0
    global.WebGLRenderingContext = WebGLRenderingContext;
    global.WebGLActiveInfo = emptyCallback;
    global.WebGLBuffer = emptyCallback;
    global.WebGLContextEvent = emptyCallback;
    global.WebGLFramebuffer = emptyCallback;
    global.WebGLProgram = emptyCallback;
    global.WebGLQuery = emptyCallback;
    global.WebGLRenderbuffer = emptyCallback;
    global.WebGLShader = emptyCallback;
    global.WebGLShaderPrecisionFormat = emptyCallback;
    global.WebGLTexture = emptyCallback;
    global.WebGLUniformLocation = emptyCallback;

    // WebGL 2.0
    global.WebGL2RenderingContext = emptyCallback;
    global.WebGLSync = emptyCallback;
    global.WebGLTransformFeedback = emptyCallback;
    global.WebGLSampler = emptyCallback;
    global.WebGLVertexArrayObject = emptyCallback;
}

export function createOpenGLInstance() {
    const canvas = new HTMLCanvasElement(640, 480);
    const openGL = canvas.getContext("webgl2");

    return openGL;
}
