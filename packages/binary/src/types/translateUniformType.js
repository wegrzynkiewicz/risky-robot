import * as Binary from "../..";

const map = {
    [WebGL2RenderingContext['FLOAT_VEC2']]: "vec2<f32>",
    [WebGL2RenderingContext['FLOAT_VEC3']]: "vec3<f32>",
    [WebGL2RenderingContext['FLOAT_VEC4']]: "vec4<f32>",
    [WebGL2RenderingContext['INT_VEC2']]: "vec2<s32>",
    [WebGL2RenderingContext['INT_VEC3']]: "vec3<s32>",
    [WebGL2RenderingContext['INT_VEC4']]: "vec4<s32>",
    [WebGL2RenderingContext['BOOL']]: "u8",
    [WebGL2RenderingContext['BOOL_VEC2']]: "vec2<u2>",
    [WebGL2RenderingContext['BOOL_VEC3']]: "vec3<u2>",
    [WebGL2RenderingContext['BOOL_VEC4']]: "vec4<u2>",
    [WebGL2RenderingContext['FLOAT_MAT2']]: "mat2<f32>",
    [WebGL2RenderingContext['FLOAT_MAT3']]: "mat3<f32>",
    [WebGL2RenderingContext['FLOAT_MAT4']]: "mat4<f32>",
    [WebGL2RenderingContext['SAMPLER_2D']]: "u8",
    [WebGL2RenderingContext['SAMPLER_CUBE']]: "u8",
};

export default function translateUniformType(code) {
    const typeName = map[code];
    if (typeName === undefined) {
        throw new Error(`Cannot translate type (${code}).`)
    }
    const type = Binary.types.getTypeByName(typeName);
    return type;
}
