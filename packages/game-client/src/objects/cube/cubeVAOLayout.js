import VAOLayout from "../../layout/VAOLayout";

const cubeVAOLayout = new VAOLayout({
    primitive: "triangle",
    elements: 12,
    buffers: [
        new VAOLayout.Buffer({
            type: "array",
            schema: "abc",
            attributes: [
                new VAOLayout.Attribute({name: "a_VertexPosition", type: "vec3<f32>"}),
                new VAOLayout.Attribute({name: "a_VertexNormal", type: "vec3<f32>"}),
                new VAOLayout.Attribute({name: "a_VertexColor", type: "vec3<u8>", normalize: true}),
            ],
        }),
    ],
});

export default cubeVAOLayout;
