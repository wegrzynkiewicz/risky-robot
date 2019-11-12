#version 300 es

layout(location=0) in vec3 _vertexPosition;
layout(location=1) in vec3 _vertexNormal;
layout(location=2) in vec3 _blockColor;
layout(location=3) in float _blockCount;

uniform highp mat4 viewMatrix;
uniform highp mat4 modelMatrix;
uniform highp mat4 projectionMatrix;

out vec3 fragmentPosition;
out vec3 fragmentNormal;
out vec3 fragmentColor;

const int chunkSize = 32;
const float step = 2.0;

vec3 calculatePosition(int cubeIndex, vec3 _vertexPosition) {
    float y = float(cubeIndex >> 10);
    float z = float(cubeIndex % 1024 >> 5);
    float x = float(cubeIndex % 32);

    vec3 positionOffset = vec3(x, y, z) * step - 32.0;

    return _vertexPosition + positionOffset;
}

//vec3 calculatePosition(int cubeIndex, vec3 _vertexPosition) {
//    float y = float(cubeIndex >> 6);
//    float z = float(cubeIndex % 64 >> 3);
//    float x = float(cubeIndex % 8);
//
//    vec3 positionOffset = vec3(x, y, z) * step - 7.0;
//
//    return _vertexPosition + positionOffset;
//}

void main(void) {

    int cubeIndex = int(_blockCount);
    vec3 position = calculatePosition(cubeIndex, _vertexPosition);
    fragmentPosition = vec3(modelMatrix * vec4(position, 1.0));
    fragmentNormal = _vertexNormal;
    fragmentColor = _blockColor;
    gl_Position = projectionMatrix * viewMatrix * vec4(fragmentPosition, 1.0);
}
