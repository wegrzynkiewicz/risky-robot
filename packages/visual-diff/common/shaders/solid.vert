#version 300 es

layout(location = 0) in vec3 a_Position;
layout(location = 1) in vec3 a_Normal;

struct Light {
    vec3 position;
    vec3 color;
};

layout (std140) uniform Matrices {
    lowp mat4 u_modelMatrix;
    Light tragedia;
};

void main(void) {
    gl_Position = u_modelMatrix * vec4(a_Position - 0.5, 1.0);
}
