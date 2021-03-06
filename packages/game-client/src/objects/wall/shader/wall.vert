#version 300 es

layout(location=0) in vec3 a_Position;
layout(location=1) in vec3 a_Normal;

uniform highp mat4 u_viewMatrix;
uniform TestBlock {
    highp mat4 u_viewMatrix1;
    highp mat4 u_modelMatrix;
    highp mat4 u_projectionMatrix;
};

out vec3 v_fragmentPosition;
out vec3 v_fragmentNormal;

void main(void) {
    v_fragmentPosition = vec3(u_modelMatrix * vec4(a_Position, 1.0));
    v_fragmentNormal = a_Normal;
    gl_Position = u_projectionMatrix * u_viewMatrix1 * vec4(v_fragmentPosition, 1.0);
}
