import VAOLayout from '../../layout/VAOLayout';

new VAOLayout.Buffer({
    type: 'array',
    schema: 'ab/c',
    attributes: [
        new VAOLayout.Attribute({name: 'a_VertexOrientation', type: 'u8'}),
        new VAOLayout.Attribute({name: 'a_VertexHeight', type: 'u8'}),

        new VAOLayout.Attribute({name: 'a_Normal', type: 'vec3<f32>', divisor: 1}),
        new VAOLayout.Attribute({name: 'a_PositionIndex', type: 'u16', divisor: 2}),
    ],
});

export default cubeVAOLayout;


// 00000000 00000000 00000000 00000000
// PPPPPPPP PPPPPPPP    RPOOO

// 00110

// 00000000
//  RTOOOVV

// 00000000
