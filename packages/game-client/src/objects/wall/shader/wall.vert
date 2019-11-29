#version 300 es

layout(location=0) in vec3 a_VertexPosition;

uniform highp mat4 u_modelMatrix;
uniform highp mat4 u_viewMatrix;
uniform highp mat4 u_projectionMatrix;

out vec3 v_fragmentPosition;
out vec3 v_fragmentNormal;
out vec3 v_fragmentColor;
out vec3 v_fragmentColor1;

void main(void) {
    v_fragmentPosition = vec3(u_modelMatrix * vec4(a_VertexPosition, 1.0));
    gl_Position = u_projectionMatrix * u_viewMatrix * vec4(v_fragmentPosition, 1.0);
}
