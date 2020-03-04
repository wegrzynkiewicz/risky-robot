const map = {
    COLOR_0: 'a_Color',
    JOINTS_0: 'a_Joints',
    NORMAL: 'a_Normal',
    POSITION: 'a_Position',
    TANGENT: 'a_Tangent',
    TEXCOORD_0: 'a_TexCoords',
    WEIGHTS_0: 'a_Weights',
};

export default function translateAttributeName(attributeKey) {
    const mapped = map[attributeKey];
    if (mapped === undefined) {
        throw new Error(`Not supported attribute name (${attributeKey}).`);
    }
    return mapped;
}
