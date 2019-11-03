class FloatBufferBuilder {

    constructor(size) {
        this.offset = 0;
        this.buffer = new Float32Array(size);
    }

    vec3(x, y, z) {
        this.buffer[this.offset++] = x;
        this.buffer[this.offset++] = y;
        this.buffer[this.offset++] = z;
        return this;
    }
}

export default {
    data() {

        const builder = new FloatBufferBuilder(6*6*6);

        // front
        builder.vec3(-1.0, -1.0, 1.0).vec3(0.0, 0.0, 1.0);
        builder.vec3(1.0, -1.0, 1.0).vec3(0.0, 0.0, 1.0);
        builder.vec3(1.0, 1.0, 1.0).vec3(0.0, 0.0, 1.0);
        builder.vec3(1.0, 1.0, 1.0).vec3(0.0, 0.0, 1.0);
        builder.vec3(-1.0, 1.0, 1.0).vec3(0.0, 0.0, 1.0);
        builder.vec3(-1.0, -1.0, 1.0).vec3(0.0, 0.0, 1.0);

        // back
        builder.vec3(-1.0, -1.0, -1.0).vec3(0.0, 0.0, -1.0);
        builder.vec3(1.0, 1.0, -1.0).vec3(0.0, 0.0, -1.0);
        builder.vec3(1.0, -1.0, -1.0).vec3(0.0, 0.0, -1.0);
        builder.vec3(-1.0, 1.0, -1.0).vec3(0.0, 0.0, -1.0);
        builder.vec3(1.0, 1.0, -1.0).vec3(0.0, 0.0, -1.0);
        builder.vec3(-1.0, -1.0, -1.0).vec3(0.0, 0.0, -1.0);

        // left
        builder.vec3(-1.0, 1.0, 1.0).vec3(-1.0, 0.0, 0.0);
        builder.vec3(-1.0, 1.0, -1.0).vec3(-1.0, 0.0, 0.0);
        builder.vec3(-1.0, -1.0, -1.0).vec3(-1.0, 0.0, 0.0);
        builder.vec3(-1.0, -1.0, -1.0).vec3(-1.0, 0.0, 0.0);
        builder.vec3(-1.0, -1.0, 1.0).vec3(-1.0, 0.0, 0.0);
        builder.vec3(-1.0, 1.0, 1.0).vec3(-1.0, 0.0, 0.0);

        // right
        builder.vec3(1.0, 1.0, 1.0).vec3(1.0, 0.0, 0.0);
        builder.vec3(1.0, -1.0, -1.0).vec3(1.0, 0.0, 0.0);
        builder.vec3(1.0, 1.0, -1.0).vec3(1.0, 0.0, 0.0);
        builder.vec3(1.0, -1.0, -1.0).vec3(1.0, 0.0, 0.0);
        builder.vec3(1.0, 1.0, 1.0).vec3(1.0, 0.0, 0.0);
        builder.vec3(1.0, -1.0, 1.0).vec3(1.0, 0.0, 0.0);

        // top
        builder.vec3(-1.0, 1.0, -1.0).vec3(0.0, 1.0, 0.0);
        builder.vec3(1.0, 1.0, 1.0).vec3(0.0, 1.0, 0.0);
        builder.vec3(1.0, 1.0, -1.0).vec3(0.0, 1.0, 0.0);
        builder.vec3(1.0, 1.0, 1.0).vec3(0.0, 1.0, 0.0);
        builder.vec3(-1.0, 1.0, -1.0).vec3(0.0, 1.0, 0.0);
        builder.vec3(-1.0, 1.0, 1.0).vec3(0.0, 1.0, 0.0);

        // bottom
        builder.vec3(-1.0, -1.0, -1.0).vec3(0.0, -1.0, 0.0);
        builder.vec3(1.0, -1.0, -1.0).vec3(0.0, -1.0, 0.0);
        builder.vec3(1.0, -1.0, 1.0).vec3(0.0, -1.0, 0.0);
        builder.vec3(1.0, -1.0, 1.0).vec3(0.0, -1.0, 0.0);
        builder.vec3(-1.0, -1.0, 1.0).vec3(0.0, -1.0, 0.0);
        builder.vec3(-1.0, -1.0, -1.0).vec3(0.0, -1.0, 0.0);

        return builder.buffer;
    }

}
