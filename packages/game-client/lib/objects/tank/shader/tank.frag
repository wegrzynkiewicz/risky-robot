#version 300 es

in lowp vec2 fragmentTextureCoords;

uniform sampler2D u_Sampler;

out lowp vec4 outputColor;

void main(void) {
    outputColor = texture(u_Sampler, fragmentTextureCoords);
}
