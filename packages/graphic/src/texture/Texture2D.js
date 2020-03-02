export default class Texture2D {

    constructor({name, openGL, width, height, internalFormat, parameters}) {

        const openGLTextureInternalFormat = openGL[internalFormat];
        if (openGLTextureInternalFormat === undefined) {
            throw new Error('Invalid texture internal format.');
        }

        this.name = name;
        this.width = width;
        this.height = height;
        this.openGL = openGL;
        this.openGLTexturePointer = openGL.createTexture();
        this.openGLTextureType = openGL['TEXTURE_2D'];
        this.openGLTextureTypeName = 'TEXTURE_2D';
        this.openGLTextureInternalFormat = openGLTextureInternalFormat;
        this.openGLTextureInternalFormatName = internalFormat;
        this.parameters = parameters;
    }

    bind() {
        this.openGL.bindTexture(this.openGLTextureType, this.openGLTexturePointer);
    }

    putData({level, format, type, data}) {
        const openGLDataFormat = this.openGL[format];
        if (openGLDataFormat === undefined) {
            throw new Error('Invalid texture data format.');
        }

        const openGLDataType = this.openGL[type];
        if (openGLDataType === undefined) {
            throw new Error('Invalid texture data type.');
        }

        this.bind();

        const border = 0;
        this.openGL.texImage2D(
            this.openGLTextureType,
            level,
            this.openGLTextureInternalFormat,
            this.width,
            this.height,
            border,
            openGLDataFormat,
            openGLDataType,
            data
        );

        console.log(this);

        //this.openGL.generateMipmap(this.openGLTextureType);
    }

    applyParameters() {
        this.bind();
        const {openGL, openGLTextureType} = this;
        this.parameters.apply({openGL, openGLTextureType});
    }
}
