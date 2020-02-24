import * as Binary from "../..";

const map = {
    [WebGL2RenderingContext['FLOAT_VEC2']]: "std140_vec2<f32>",
    [WebGL2RenderingContext['FLOAT_VEC3']]: "std140_vec3<f32>",
    [WebGL2RenderingContext['FLOAT_VEC4']]: "std140_vec4<f32>",
    [WebGL2RenderingContext['INT_VEC2']]: "std140_vec2<s32>",
    [WebGL2RenderingContext['INT_VEC3']]: "std140_vec3<s32>",
    [WebGL2RenderingContext['INT_VEC4']]: "std140_vec4<s32>",
    [WebGL2RenderingContext['BOOL']]: "u32",
    [WebGL2RenderingContext['BOOL_VEC2']]: "std140_vec2<u32>",
    [WebGL2RenderingContext['BOOL_VEC3']]: "std140_vec3<u32>",
    [WebGL2RenderingContext['BOOL_VEC4']]: "std140_vec4<u32>",
    [WebGL2RenderingContext['FLOAT_MAT2']]: "std140_mat2<f32>",
    [WebGL2RenderingContext['FLOAT_MAT3']]: "std140_mat3<f32>",
    [WebGL2RenderingContext['FLOAT_MAT4']]: "std140_mat4<f32>",
    [WebGL2RenderingContext['SAMPLER_2D']]: "u32",
    [WebGL2RenderingContext['SAMPLER_CUBE']]: "u32",
};

export default function translateUniformType(code) {
    const typeName = map[code];
    if (typeName === undefined) {
        throw new Error(`Cannot translate type (${code}).`)
    }
    const type = Binary.types.getTypeByName(typeName);
    return type;
}
