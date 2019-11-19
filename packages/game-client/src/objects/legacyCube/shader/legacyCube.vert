#version 300 es

layout(location=0) in int a_VertexOrientIndex;
layout(location=1) in int a_VertexHeight;
layout(location=2) in int a_Index;

uniform highp mat4 viewMatrix;
uniform highp mat4 modelMatrix;
uniform highp mat4 projectionMatrix;

out vec3 fragmentPosition;
out vec3 fragmentNormal;
out vec3 fragmentColor;

layout (std140) uniform UniformBlock {
    vec4 offsets[36];
};

float step = 1.0;

vec3 calculatePosition(int cubeIndex, vec3 _vertexPosition) {
    float y = float(cubeIndex >> 10);
    float z = float(cubeIndex % 1024 >> 5);
    float x = float(cubeIndex % 32);

    vec3 positionOffset = vec3(x, y, z) * step - 32.0;

    return _vertexPosition + positionOffset;
}

void main(void) {

    vec3 pos = calculatePosition(a_Index, vec3(
        offsets[a_VertexOrientIndex].x,
        float(a_VertexHeight),
        offsets[a_VertexOrientIndex].y
        )
    );

    fragmentPosition = vec3(modelMatrix * vec4(pos, 1.0));
    fragmentColor = fragmentPosition;
    gl_Position = projectionMatrix * viewMatrix * vec4(fragmentPosition, 1.0);
}
