import * as Frontend from "robo24-frontend";

import triangleVertex from "./triangle.vert";
import triangleFragment from "./triangle.frag";

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

    const {bufferManager, vaoManager, programManager} = system.view;

    const buffer = bufferManager.createBuffer({
        name: "triangle",
        type: "array",
        bufferLayout
    });

    const vao = vaoManager.createVAO({
        name: "triangle",
    });

    programManager.registerShaderContent("triangle", triangleVertex, triangleFragment);
    programManager.getProgramByName("triangle");

    console.log(buffer);
});
