#version 300 es

in lowp vec3 fragmentColor;

out lowp vec4 outputColor;

void main(void) {
    outputColor = vec4(fragmentColor, 1.0);
}
