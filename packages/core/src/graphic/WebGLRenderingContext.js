const webGLRenderingContext = (function () {

    if (typeof WebGL2RenderingContext !== "undefined") {
        return WebGL2RenderingContext;
    }

    if (typeof WebGLRenderingContext !== "undefined") {
        return WebGLRenderingContext;
    }

    return {};
})();

export default webGLRenderingContext;
