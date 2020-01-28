export default class Texture2D {

    constructor({name, openGL, width, height, internalFormat}) {

        const openGLTextureInternalFormat = openGL[internalFormat];
        if (openGLBufferTypeName === undefined) {
            throw new Error("Invalid texture internal format.");
        }

        this.name = name;
        this.width = width;
        this.height = height;
        this.openGLPointer = openGL.createTexture();
        this.openGLType = openGL['TEXTURE_2D'];
        this.openGLTypeName = "TEXTURE_2D";
        this.openGLInternalFormat = openGLTextureInternalFormat;
        this.openGLInternalFormatName = internalFormat;
        this.openGL = openGL;
    }

    bind() {
        const {openGL, openGLType, openGLPointer} = this;
        openGL.bindTexture(openGLType, openGLPointer);
    }

    putData({level, format, type, dataView}) {
        const {openGL, openGLType, openGLPointer, width, height} = this;

        const openGLTextureFormat = openGL[format];
        if (openGLTextureFormat === undefined) {
            throw new Error("Invalid texture data format.");
        }

        const openGLTextureType = openGL[type];
        if (openGLTextureType === undefined) {
            throw new Error("Invalid texture data type.");
        }

        openGL.bindTexture(openGLType, openGLPointer);
        openGL.texImage2D(
            openGLType,
            level,
            openGLInternalFormat,
            width,
            height,
            openGLTextureFormat,
            openGLTextureType,
            dataView
        );
    }
}
