#version 300 es

in lowp vec3 v_FragmentColor;

layout(location = 0) out lowp vec4 o_FragmentColor;

void main(void) {
    o_FragmentColor = vec4(v_FragmentColor, 1.0);
}
