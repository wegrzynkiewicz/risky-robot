#version 300 es

in lowp vec3 v_FragmentColor;

layout(location = 0) out lowp vec4 o_FragmentColor;

void main(void) {
    o_FragmentColor = vec4(1.0, 0.1, 0.1, 1.0);
}
