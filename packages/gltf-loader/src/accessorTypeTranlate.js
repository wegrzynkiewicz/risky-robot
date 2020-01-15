const typesMap = {
    'SCALAR': '',
    'VEC2': 'vec2',
    'VEC3': 'vec3',
    'VEC4': 'vec4',
    'MAT2': 'mat2',
    'MAT3': 'mat3',
    'MAT4': 'mat4',
};

const componentTypesMap = {
    '5120': 's8',
    '5121': 'u8',
    '5122': 's16',
    '5123': 'u16',
    '5124': 's32',
    '5125': 'u32',
    '5126': 'f32',
};

export default function accessorTypeTranslate(type, componentType) {

    const translatedType = typesMap[type];
    if (translatedType === undefined) {
        throw new Error(`Not found accessor type named (${type})`);
    }

    const normalizedComponentType = componentType.toString();
    const translatedComponentType = componentTypesMap[normalizedComponentType];
    if (translatedComponentType === undefined) {
        throw new Error(`Not found accessor component type named (${normalizedComponentType})`);
    }

    if (translatedType === "") {
        return translatedComponentType;
    }

    return `${translatedType}<${translatedComponentType}>`;
}
