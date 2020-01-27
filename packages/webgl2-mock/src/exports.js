import CanvasRenderingContext2D from "./CanvasRenderingContext2D";
import HTMLCanvasElement from "./HTMLCanvasElement";
import ImageData from "./ImageData";
import Image from "./Image";
import WebGLRenderingContext from "./WebGLRenderingContext";

// canvas
global.HTMLCanvasElement = HTMLCanvasElement;
global.CanvasRenderingContext2D = CanvasRenderingContext2D;
global.ImageData = ImageData;
global.Image = Image;
global.HTMLImageElement = Image;
global.HTMLVideoElement = Image;

// WebGL 1.0
global.WebGLRenderingContext = WebGLRenderingContext;
global.WebGLActiveInfo = function() {};
global.WebGLBuffer = function() {};
global.WebGLContextEvent = function() {};
global.WebGLFramebuffer = function() {};
global.WebGLProgram = function() {};
global.WebGLQuery = function() {};
global.WebGLRenderbuffer = function() {};
global.WebGLShader = function() {};
global.WebGLShaderPrecisionFormat = function() {};
global.WebGLTexture = function() {};
global.WebGLUniformLocation = function() {};

// WebGL 2.0
global.WebGL2RenderingContext = function() {};
global.WebGLSync = function() {};
global.WebGLTransformFeedback = function() {};
global.WebGLSampler = function() {};
global.WebGLVertexArrayObject = function() {};
