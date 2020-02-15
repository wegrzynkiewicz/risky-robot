#version 300 es

layout(location = 0) in vec3 a_Position;
layout(location = 1) in vec3 a_Color;

out vec3 v_FragmentColor;

void main(void) {
    gl_Position = vec4(a_Position, 1.0);
    v_FragmentColor = a_Color;
}
