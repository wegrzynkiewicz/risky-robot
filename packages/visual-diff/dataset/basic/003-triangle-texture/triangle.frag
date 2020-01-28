#version 300 es

in lowp vec2 v_FragmentTextureCoords;

uniform sampler2D u_Example;

layout(location = 0) out lowp vec4 o_FragmentColor;

void main(void) {
    o_FragmentColor = texture(u_Example, v_FragmentTextureCoords);
}
