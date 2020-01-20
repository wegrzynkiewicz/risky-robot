export default function getOpenGLContext(canvasElementId) {

    const element = window.document.getElementById(canvasElementId);
    const openGL = element.getContext('webgl2');

    if (!openGL) {
        throw new Error('Unable to initialize WebGL2. Your browser or machine may not support it.');
    }

    return openGL;
}
