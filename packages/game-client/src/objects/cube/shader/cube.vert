#version 300 es

layout(location=0) in vec3 a_VertexPosition;
layout(location=1) in vec3 a_VertexNormal;
layout(location=2) in vec3 a_VertexColor;

uniform highp mat4 u_worldMatrix;
uniform highp mat4 u_localMatrix;
uniform highp mat4 u_projectionMatrix;

out vec3 v_fragmentPosition;
out vec3 v_fragmentNormal;
out vec3 v_fragmentColor;

void main(void) {
    v_fragmentPosition = vec3(u_localMatrix * vec4(a_VertexPosition, 1.0));
    v_fragmentColor = a_VertexColor;
    gl_Position = u_projectionMatrix * u_worldMatrix * vec4(v_fragmentPosition, 1.0);
}
