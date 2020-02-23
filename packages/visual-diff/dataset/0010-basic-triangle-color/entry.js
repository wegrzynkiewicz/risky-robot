import * as Frontend from "robo24-frontend";

import vertexShaderContent from "./shader.vert";
import fragmentShaderContent from "./shader.frag";

const {Graphic} = Frontend;

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const system = Frontend.createBasicSystem({window, canvas});
    const {view} = system;

    const layout = Graphic.VAOLayout.createBasicLayout({
        openGLPrimitiveType: WebGL2RenderingContext["TRIANGLES"],
        verticesCount: 3,
        indicesCount: 0,
        attributes: [
            {buffer: "primary", batch: 0, location: 0, name: "a_Position", type: "vec3<f32>"},
            {buffer: "primary", batch: 0, location: 1, name: "a_Color", type: "vec3<f32>"},
        ],
    });

    const bufferLayout = layout.getBufferLayout("primary");
    const dataView = bufferLayout.createDataView();

    const positionAttributeLayout = bufferLayout.getAttributeLayoutByName("a_Position");
    const positionAccessor = positionAttributeLayout.createAccessor({dataView});
    positionAccessor.writeElement(0, [-0.5, -0.5, 0]);
    positionAccessor.writeElement(1, [0.5, -0.5, 0]);
    positionAccessor.writeElement(2, [-0.5, 0.5, 0]);

    const colorAttributeLayout = bufferLayout.getAttributeLayoutByName("a_Color");
    const colorAccessor = colorAttributeLayout.createAccessor({dataView});
    colorAccessor.writeElement(0, [1, 0, 0]);
    colorAccessor.writeElement(1, [0, 1, 0]);
    colorAccessor.writeElement(2, [0, 0, 1]);

    const {bufferManager, vaoManager} = system.view;

    const buffer = bufferManager.createArrayBuffer({
        name: "triangle",
        usage: WebGL2RenderingContext["STATIC_DRAW"],
        bufferLayout
    });
    buffer.setBufferData(dataView);

    const programFactory = new Graphic.ContentProgramFactory({view});
    const program = programFactory.createProgram({
        name: "triangle",
        fragment: fragmentShaderContent,
        vertex: vertexShaderContent,
    });

    const vao = vaoManager.createVAO({
        name: "triangle",
        program,
        layout,
        attributeBuffers: [buffer],
    });

    system.animationLoop.on("frame", () => {
        program.use();
        vao.bind();
        const {openGLPrimitiveType, verticesCount} = vao.layout.allocation;
        system.view.openGL.drawArrays(openGLPrimitiveType, 0, verticesCount);
    });
});
