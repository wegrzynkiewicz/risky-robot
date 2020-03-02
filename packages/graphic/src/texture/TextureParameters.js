export default class TextureParameters {

    constructor() {
        this.magnifyingFilter = 'LINEAR';
        this.minifyingFilter = 'LINEAR';
        this.wrapS = 'REPEAT';
        this.wrapT = 'REPEAT';
        this.wrapR = 'REPEAT';
    }

    apply({openGL, openGLTextureType}) {
        const {} = this;
        openGL.texParameteri(openGLTextureType, openGL.TEXTURE_MAG_FILTER, openGL[this.magnifyingFilter]);
        openGL.texParameteri(openGLTextureType, openGL.TEXTURE_MIN_FILTER, openGL[this.minifyingFilter]);
        openGL.texParameteri(openGLTextureType, openGL.TEXTURE_WRAP_S, openGL[this.wrapS]);
        openGL.texParameteri(openGLTextureType, openGL.TEXTURE_WRAP_T, openGL[this.wrapT]);
        openGL.texParameteri(openGLTextureType, openGL.TEXTURE_WRAP_R, openGL[this.wrapR]);
    }
}
