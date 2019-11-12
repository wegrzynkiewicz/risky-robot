const regexUniform = new RegExp("^uniform(?:[\\w+ ])* (?<uniform>\\w+);$", "mg");
const regexAttribute = new RegExp("(?<attribute>a_\\w+);$", "mg");

const shaders = {
    vertex: WebGL2RenderingContext.VERTEX_SHADER,
    fragment: WebGL2RenderingContext.FRAGMENT_SHADER,
};

export default class Shader {

    constructor(openGL, contents) {
        this.openGL = openGL;
        this.program = this.createProgram(contents);
        this.contents = contents;
        this.uniforms = Object.create(null);
        this.attributes = Object.create(null);
        this.bindLayoutLocation();
    }

    bindLayoutLocation() {
        for (let shaderContent of Object.values(this.contents)) {
            while (true) {
                let matches = regexUniform.exec(shaderContent);
                if (matches === null) {
                    break;
                }
                const uniform = matches[1];
                const location = this.openGL.getUniformLocation(this.program, uniform);
                this.uniforms[uniform] = location;
            }
        }
        while (true) {
            let matches = regexAttribute.exec(this.contents.vertex);
            if (matches === null) {
                break;
            }
            const attribute = matches[1];
            const location = this.openGL.getAttribLocation(this.program, attribute);
            this.attributes[attribute] = location;
        }
    }

    createProgram(contents) {
        const program = this.openGL.createProgram();
        for (let [shaderKey, shaderType] of Object.entries(shaders)) {
            const shaderContent = contents[shaderKey];
            if (shaderContent === undefined) {
                continue;
            }
            const shader = this.createShader(shaderType, shaderContent);
            this.openGL.attachShader(program, shader);
        }
        this.openGL.linkProgram(program);

        if (!this.openGL.getProgramParameter(program, this.openGL.LINK_STATUS)) {
            const message = this.openGL.getProgramInfoLog(program);
            throw new Error(`Unable to initialize the shader program: ${message}`);
        }

        return program;
    }

    createShader(type, source) {
        const shader = this.openGL.createShader(type);
        this.openGL.shaderSource(shader, source);
        this.openGL.compileShader(shader);

        if (!this.openGL.getShaderParameter(shader, this.openGL.COMPILE_STATUS)) {
            const message = this.openGL.getShaderInfoLog(shader);
            this.openGL.deleteShader(shader);
            throw new Error(`An error occurred compiling the shaders: ${message}`);
        }

        return shader;
    }
}
