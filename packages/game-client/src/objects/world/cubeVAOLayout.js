import VAOLayout from "../../layout/VAOLayout";

const cubeVAOLayout = new VAOLayout({
    primitive: "triangle",
    elements: 12,
    buffers: [
        new VAOLayout.Buffer({
            type: "array",
            schema: "ab/c",
            attributes: [
                new VAOLayout.Attribute({name: "a_VertexOrientation", type: "u8"}),
                new VAOLayout.Attribute({name: "a_VertexHeight", type: "u8"}),

                new VAOLayout.Attribute({name: "a_VertexNormal", type: "vec3<f32>", divisor: 1}),
                new VAOLayout.Attribute({name: "a_PositionIndex", type: "u16", divisor: 2}),
            ],
        }),
    ],
});

export default cubeVAOLayout;
