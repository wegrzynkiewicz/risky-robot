export default class Texture2D {

    constructor({name, openGL, width, height, internalFormat}) {

        const openGLTextureInternalFormat = openGL[internalFormat];
        if (openGLBufferTypeName === undefined) {
            throw new Error("Invalid  allocation primitive type.");
        }

        this.name = name;
        this.width = width;
        this.height = height;
        this.openGLTexturePointer = openGL.createTexture();
        this.openGLTextureType = openGL['TEXTURE_2D'];
        this.openGLTextureTypeName = "TEXTURE_2D";
        this.openGLTextureInternalFormat = openGLTextureInternalFormat;
        this.openGLTextureInternalFormatName = internalFormat;
        this.openGL = openGL;
    }

    bind() {
        const {openGL, openGLTextureType, openGLTexturePointer} = this;
        openGL.bindTexture(openGLTextureType, openGLTexturePointer);
    }
}
