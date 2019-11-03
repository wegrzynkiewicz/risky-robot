#version 300 es

layout(location = 0) in vec3 a_VertexPosition;
layout(location = 1) in vec3 a_VertexColor;

uniform highp mat4 projectionMatrix;
uniform highp mat4 modelMatrix;
uniform highp mat4 viewMatrix;

out vec3 fragmentColor;

void main(void) {
    fragmentColor = a_VertexColor;
    gl_PointSize = 8.0;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(a_VertexPosition, 1.0);
}
