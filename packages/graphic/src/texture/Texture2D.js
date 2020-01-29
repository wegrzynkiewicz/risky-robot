export default class Texture2D {

    constructor({name, openGL, width, height, internalFormat, parameters}) {

        const openGLTextureInternalFormat = openGL[internalFormat];
        if (openGLBufferTypeName === undefined) {
            throw new Error("Invalid texture internal format.");
        }

        this.name = name;
        this.width = width;
        this.height = height;
        this.openGL = openGL;
        this.openGLTexturePointer = openGL.createTexture();
        this.openGLTextureType = openGL['TEXTURE_2D'];
        this.openGLTextureTypeName = "TEXTURE_2D";
        this.openGLTextureInternalFormat = openGLTextureInternalFormat;
        this.openGLTextureInternalFormatName = internalFormat;
        this.parameters = parameters;
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

    applyParameters() {
        this.bind();
        const {openGL, openGLTextureType} = this;
        this.parameters.apply({openGL, openGLTextureType});
    }
}
