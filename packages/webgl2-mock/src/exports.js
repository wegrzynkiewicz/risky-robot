import CanvasRenderingContext2D from './CanvasRenderingContext2D';
import HTMLCanvasElement from './HTMLCanvasElement';
import Image from './Image';
import ImageData from './ImageData';
import WebGLRenderingContext from './WebGLRenderingContext';

function emptyCallback() {
    return undefined;
}

export function registerGlobals() {
    // Canvas
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
    global.WebGL2RenderingContext = WebGLRenderingContext;
    global.WebGLSync = emptyCallback;
    global.WebGLTransformFeedback = emptyCallback;
    global.WebGLSampler = emptyCallback;
    global.WebGLVertexArrayObject = emptyCallback;
}

export function createOpenGLInstance() {
    const width = 640;
    const height = 480;
    const canvas = new HTMLCanvasElement(width, height);
    const openGL = canvas.getContext('webgl2');

    return openGL;
}
