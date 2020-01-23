out vec2 v_FragmentTextureCoords;

vec4 vertices[3] = vec4[3](
/* 0 */ vec4(-1, -1, 0, 1),
/* 1 */ vec4(3, -1, 0, 1),
/* 2 */ vec4(-1, 3, 0, 1)
);
vec2 texcoords[3] = vec2[3](
/* 0 */ vec2(0, 0),
/* 1 */ vec2(2, 0),
/* 2 */ vec2(0, 2)
);

void main() {
    gl_Position = vertices[gl_VertexID];
    v_FragmentTextureCoords = texcoords[gl_VertexID];
}
