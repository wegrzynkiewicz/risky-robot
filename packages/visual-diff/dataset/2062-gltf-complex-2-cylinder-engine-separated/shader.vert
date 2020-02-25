#version 300 es

layout(location = 0) in vec3 a_Position;
layout(location = 1) in vec3 a_Normal;

layout (std140) uniform Matrices {
    lowp mat4 u_modelMatrix;
    lowp mat4 u_viewMatrix;
    lowp mat4 u_projectionMatrix;
};

out vec3 v_Color;

void main(void) {
    gl_Position = u_projectionMatrix * u_viewMatrix* u_modelMatrix * vec4(a_Position, 1.0);
    v_Color = a_Normal;
}
