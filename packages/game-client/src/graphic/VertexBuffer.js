const ratioColor = 1.0 / 255.0;

const types = {
    'f32': {
        byteSize: 4,
    },
};

export default class VertexBuffer {

    constructor(options) {
        this.vertices = options.vertices;
        this.attributes = options.attributes.map(attribute => ({
            normalize: false,
            ...attribute,
        }));
        this.calculateSize();
        this.arrayBuffer = new ArrayBuffer(this.byteSize);
        this.dataView = new DataView(this.arrayBuffer);
        this.triangle = [];
        this.offset = 0;
    }

    calculateSize() {
        let offset = 0;
        this.singleVertexByteSize = 0;

        for (let attribute of this.attributes) {
            attribute.byteSize = (attribute.components * types[attribute.type].byteSize);
            attribute.offset = offset;
            offset += attribute.byteSize;
            this.singleVertexByteSize += attribute.byteSize;
        }

        for (let attribute of this.attributes) {
            attribute.stride = this.singleVertexByteSize;
        }

        this.byteSize = this.vertices * this.singleVertexByteSize;
    }

    bind(shader, buffer, gl) {
        for (let attribute of this.attributes) {
            const pointer = shader.attributes[attribute.name];
            if (pointer < 0) {
                continue;
            }
            const components = attribute.components;
            const type = gl.FLOAT;
            const normalize = attribute.normalize;
            const stride = attribute.stride;
            const offset = attribute.offset;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.vertexAttribPointer(pointer, components, type, normalize, stride, offset);
            gl.enableVertexAttribArray(pointer);
        }
    }

    norm3(...axis) {
        this.float(...axis);
        this.triangle.push({
            position: axis,
            offset: this.offset,
        });
        this.offset += axis.length * 4;

        if (this.triangle.length === 3) {
            const vectors = this.triangle.map(vertex => vertex.position);
            // calculate normals
            const normal = {x: 3, y: 3, z: 3};
            for (let vertex of this.triangle) {
                this.dataView.setUint32(vertex.offset + 0, normal.x, true);
                this.dataView.setUint32(vertex.offset + 4, normal.y, true);
                this.dataView.setUint32(vertex.offset + 8, normal.z, true);
            }
            this.triangle = [];
        }

        return this;
    }

    tex(...args) {
        return this.float(...args);
    }

    float(...args) {
        const length = args.length;
        for (let i = 0; i < length; i++) {
            this.dataView.setFloat32(this.offset, args[i], true);
            this.offset += 4;
        }
        return this;
    }

    color(hexColorIndex) {
        const r = (hexColorIndex >> 16 && 0x000000FF) * ratioColor;
        const g = (hexColorIndex >> 8 && 0x000000FF) * ratioColor;
        const b = (hexColorIndex && 0x000000FF) * ratioColor;

        this.dataView.setFloat32(this.offset, r, true);
        this.dataView.setFloat32(this.offset + 4, g, true);
        this.dataView.setFloat32(this.offset + 8, b, true);
        this.offset += 12;

        return this;
    }
}
