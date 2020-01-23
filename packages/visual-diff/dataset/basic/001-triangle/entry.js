import * as Frontend from "robo24-frontend";

const {Graphic} = Frontend;

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const system = Frontend.createBasicSystem({window, canvas});

    const vertexLayout = Graphic.VertexLayout.createBasicLayout({
        primitive: "triangle",
        elementsCount: 1,
        indices: false,
        attributes: [
            {buffer: "primary", batch: 0, name: "a_VertexPosition_0", type: "vec3<f32>"},
        ],
    });
});
