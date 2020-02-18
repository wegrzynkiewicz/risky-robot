import * as Frontend from "robo24-frontend";

import vertexShaderContent from "./shader.vert";
import fragmentShaderContent from "./shader.frag";

const {Graphic} = Frontend;

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const system = Frontend.createBasicSystem({window, canvas});

    const layout = Graphic.VAOLayout.createBasicLayout({
        openGLPrimitiveType: WebGL2RenderingContext["TRIANGLES"],
        verticesCount: 3,
        indicesCount: 0,
        attributes: [
            {buffer: "primary", batch: 0, name: "a_Position", type: "vec3<f32>"},
            {buffer: "primary", batch: 0, name: "a_Color", type: "vec3<f32>"},
        ],
    });

    const bufferLayout = layout.getBufferLayout("primary");
    const dataView = bufferLayout.createDataView();

    const positionAttributeLayout = bufferLayout.getAttributeLayoutByName("a_Position");
    const positionAccessor = positionAttributeLayout.createAccessor({dataView});
    positionAccessor.write(0, [-0.5, -0.5, 0]);
    positionAccessor.write(1, [0.5, -0.5, 0]);
    positionAccessor.write(2, [-0.5, 0.5, 0]);

    const colorAttributeLayout = bufferLayout.getAttributeLayoutByName("a_Color");
    const colorAccessor = colorAttributeLayout.createAccessor({dataView});
    colorAccessor.write(0, [1, 0, 0]);
    colorAccessor.write(1, [0, 1, 0]);
    colorAccessor.write(2, [0, 0, 1]);

    const {bufferManager, vaoManager, programManager} = system.view;

    const buffer = bufferManager.createArrayBuffer({
        name: "triangle",
        usage: WebGL2RenderingContext["STATIC_DRAW"],
        bufferLayout,
    });

    buffer.setBufferData(dataView);

    programManager.registerShaderContent("triangle", vertexShaderContent, fragmentShaderContent);
    const program = programManager.getProgramByName("triangle");

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
