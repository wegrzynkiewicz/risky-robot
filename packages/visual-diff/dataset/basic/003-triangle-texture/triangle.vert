#version 300 es

layout(location = 0) in vec3 a_VertexPosition;
layout(location = 1) in vec3 a_VertexColor;

out vec3 v_FragmentColor;

void main(void) {
    gl_Position = vec4(a_VertexPosition, 1.0);
    v_FragmentColor = a_VertexColor;
}
