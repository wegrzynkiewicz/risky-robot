attribute vec3 a_Position;
attribute vec3 a_Normal;

uniform highp mat4 viewMatrix;
uniform highp mat4 modelMatrix;
uniform highp mat4 projectionMatrix;

varying vec3 fragmentPosition;
varying vec3 fragmentNormal;
varying vec3 fragmentColor;

void main(void) {
    fragmentPosition = vec3(modelMatrix * vec4(a_Position, 1.0));
    fragmentNormal = a_Normal;
    fragmentColor = fragmentPosition;
    gl_Position = projectionMatrix * viewMatrix * vec4(fragmentPosition, 1.0);


    // fragmentPosition = vec3(modelMatrix * vec4(vertexPosition, 1.0));
    // normal = mat3(transpose(inverse(modelMatrix))) * normalPosition;
    // gl_Position = projectionMatrix * viewMatrix * vec4(fragmentPosition, 1.0);
}
