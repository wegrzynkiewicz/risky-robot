attribute vec3 a_VertexPosition;

uniform highp mat4 viewMatrix;
uniform highp mat4 modelMatrix;
uniform highp mat4 projectionMatrix;

varying vec3 fragmentPosition;
varying vec3 fragmentNormal;
varying vec3 fragmentColor;

void main(void) {
    fragmentPosition = vec3(modelMatrix * vec4(a_VertexPosition, 1.0));
    fragmentColor = fragmentPosition;
    gl_Position = projectionMatrix * viewMatrix * vec4(fragmentPosition, 1.0);
}
