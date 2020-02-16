#version 300 es

layout(location = 0) in vec3 a_Position;

void main(void) {
    gl_Position = vec4(a_Position - 0.5, 1.0);
}
