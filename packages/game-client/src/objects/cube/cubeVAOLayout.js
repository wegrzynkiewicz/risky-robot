import VAOLayout from "../../layout/VAOLayout";

const cubeVAOLayout = new VAOLayout({
    vertices: 36,
    buffers: [
        new VAOLayout.Buffer({
            type: "array",
            schema: "ab/c",
            attributes: [
                new VAOLayout.Attribute({name: "a_VertexPosition", type: "vec3<f32>"}),
                new VAOLayout.Attribute({name: "a_VertexColor", type: "vec4<f32>"}),
                new VAOLayout.Attribute({name: "a_VertexNormal", type: "vec3<f32>", divisor: 2}),
            ],
        }),
    ],
});

export default cubeVAOLayout;
