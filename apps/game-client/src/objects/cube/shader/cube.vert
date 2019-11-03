attribute vec3 _vertexPosition;
attribute vec3 _vertexNormal;

uniform highp mat4 viewMatrix;
uniform highp mat4 modelMatrix;
uniform highp mat4 projectionMatrix;

varying vec3 fragmentPosition;
varying vec3 fragmentNormal;
varying vec3 fragmentColor;

void main(void) {
    fragmentPosition = vec3(modelMatrix * vec4(_vertexPosition, 1.0));
    fragmentNormal = _vertexNormal;
    fragmentColor = fragmentPosition;
    gl_Position = projectionMatrix * viewMatrix * vec4(fragmentPosition, 1.0);
}
