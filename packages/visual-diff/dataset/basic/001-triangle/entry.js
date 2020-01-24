import * as Frontend from "robo24-frontend";

const {Graphic} = Frontend;

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const system = Frontend.createBasicSystem({window, canvas});

    const vertexLayout = Graphic.VAOLayout.createBasicLayout({
        primitive: "triangle",
        elementsCount: 1,
        indices: false,
        attributes: [
            {buffer: "primary", batch: 0, name: "a_VertexPosition_0", type: "vec3<f32>"},
        ],
    });

    const bufferLayout = vertexLayout.getBufferLayout("primary");
    const dataView = bufferLayout.createDataView();
    const accessor = bufferLayout.getAccessorByName("a_VertexPosition_0");

    accessor.write(dataView, 0, [-0.5, -0.5, 0]);
    accessor.write(dataView, 1, [0.5, -0.5, 0]);
    accessor.write(dataView, 2, [-0.5, 0.5, 0]);

    const buffer = system.view.bufferManager.createBuffer({
        name: "triangle",
        type: "array",
        bufferLayout
    });

    const vao = system.view.vaoManager.createVAO({
        name: "triangle",

    })

    console.log(buffer);
});
