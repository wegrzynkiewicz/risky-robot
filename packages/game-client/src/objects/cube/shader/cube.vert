#version 300 es

layout(location=0) in vec3 a_VertexPosition;

uniform highp mat4 viewMatrix;
uniform highp mat4 modelMatrix;
uniform highp mat4 projectionMatrix;

out vec3 fragmentPosition;
out vec3 fragmentNormal;
out vec3 fragmentColor;

layout (std140) uniform UniformBlock {
    vec3 offsets[4];
};

void main(void) {
    fragmentPosition = vec3(modelMatrix * vec4(offsets[0] * a_VertexPosition, 1.0));
    fragmentColor = fragmentPosition;
    gl_Position = projectionMatrix * viewMatrix * vec4(fragmentPosition, 1.0);
}
