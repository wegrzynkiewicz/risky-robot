#version 300 es

layout(location=0) in vec3 a_VertexPosition;

void main(void) {
    gl_Position = vec4(a_VertexPosition, 1.0);
}
