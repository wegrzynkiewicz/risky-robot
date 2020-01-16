import VAOLayout from "../../layout/VAOLayout";

const cubeVAOLayout = new VAOLayout({
    buffers: [
        new VAOLayout.ArrayBufferBlueprint({
            name: "primary",
            schema: "ab/c",
            attributes: [
                new VAOLayout.Attribute({name: "a_VertexPosition", type: "vec3<f32>"}),
                new VAOLayout.Attribute({name: "a_VertexNormal", type: "vec3<f32>"}),
                new VAOLayout.Attribute({name: "a_VertexColor", type: "vec3<u8>", normalize: true}),
            ],
        }),
        new VAOLayout.ElementBuffer({
            name: "indices",
        }),
    ],
});

new VAOLayout({
    buffers: [
        new VAOLayout.ArrayBufferBlueprint({
            name: "primary",
            batches: [
                new VAOLayout.AttributeBatch({
                    attributes: [
                        new VAOLayout.Attribute({name: "a_VertexPosition", type: "vec3<f32>"}),
                        new VAOLayout.Attribute({name: "a_VertexNormal", type: "vec3<f32>"}),
                    ],
                }),
                new VAOLayout.Attribute({name: "a_VertexColor", type: "vec3<u8>", normalize: true}),
            ],
        }),
        new VAOLayout.ElementBuffer({
            name: "indices",
        }),
    ],
});


export default cubeVAOLayout;

const test = {
    "bufferView": 0,
    "byteOffset": 112356,
    "componentType": 5123,
    "count": 8964,
    "max": [
        1939
    ],
    "min": [
        0
    ],
    "type": "SCALAR"
};

const test2 = {
    "buffer": 0,
    "byteOffset": 0,
    "byteLength": 1340232,
    "byteStride": 12,
    "target": 34962
};
