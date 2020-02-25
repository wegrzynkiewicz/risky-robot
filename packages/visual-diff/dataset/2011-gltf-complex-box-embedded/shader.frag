#version 300 es

in lowp vec3 v_Color;

out lowp vec4 o_Color;

void main(void) {
    o_Color = vec4(v_Color + 0.4, 1.0);
}
