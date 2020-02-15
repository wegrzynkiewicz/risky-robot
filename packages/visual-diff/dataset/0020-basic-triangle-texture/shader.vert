#version 300 es

layout(location = 0) in vec3 a_Position;
layout(location = 1) in vec2 a_TexCoords;

out vec2 v_FragmentTextureCoords;

void main(void) {
    gl_Position = vec4(a_Position, 1.0);
    v_FragmentTextureCoords = a_TexCoords;
}
