#version 300 es

layout(location = 0) in vec3 a_Position;
layout(location = 1) in vec3 a_Normal;
layout(location = 2) in vec2 a_TexCoords;

uniform highp mat4 projectionMatrix;
uniform highp mat4 modelMatrix;
uniform highp mat4 viewMatrix;

out vec2 fragmentTextureCoords;

void main(void) {
    fragmentTextureCoords = a_TexCoords;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(a_Position, 1.0);
}
