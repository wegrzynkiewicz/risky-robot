#version 300 es

layout(location = 0) in vec3 a_Position;
layout(location = 1) in vec3 a_Normal;

out vec3 v_Position;
out vec3 v_Normal;

layout (std140) uniform Matrices {
    lowp mat4 u_modelMatrix;
    lowp mat4 u_viewMatrix;
    lowp mat4 u_projectionMatrix;
};

void main(void) {
    v_Position = vec3(u_modelMatrix * vec4(a_Position, 1.0));
    v_Normal = a_Normal;
    gl_Position = u_projectionMatrix * u_viewMatrix * u_modelMatrix * vec4(a_Position, 1.0);
}
