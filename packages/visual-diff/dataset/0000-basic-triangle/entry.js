import * as Frontend from "robo24-frontend";

import vertexShaderContent from "./shader.vert";
import fragmentShaderContent from "./shader.frag";

const {Graphic} = Frontend;

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const system = Frontend.createBasicSystem({window, canvas});

    const {view, sceneManager} = system;

    const layout = Graphic.VAOLayout.createBasicLayout({
        openGLPrimitiveType: WebGL2RenderingContext["TRIANGLES"],
        verticesCount: 3,
        indicesCount: 0,
        attributes: [
            {buffer: "primary", batch: 0, name: "a_Position", type: "vec3<f32>"},
        ],
    });

    const bufferLayout = layout.getBufferLayout("primary");
    const dataView = bufferLayout.createDataView();

    const positionAttributeLayout = bufferLayout.getAttributeLayoutByName("a_Position");
    const positionAccessor = positionAttributeLayout.createAccessor({dataView});
    positionAccessor.writeElement(0, [-0.5, -0.5, 0]);
    positionAccessor.writeElement(1, [0.5, -0.5, 0]);
    positionAccessor.writeElement(2, [-0.5, 0.5, 0]);

    const {bufferManager, vaoManager, programManager} = view;

    const buffer = bufferManager.createArrayBuffer({
        name: "triangle",
        usage: WebGL2RenderingContext["STATIC_DRAW"],
        bufferLayout
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

    //const triangleSceneNode = new Graphic.ModelSceneNode({});
    // const primaryScene = sceneManager.getSceneNodeByName("primary-scene");
    //triangleSceneNode.setParent(primaryScene);

    system.animationLoop.on("frame", () => {
        program.use();
        vao.bind();
        const {openGLPrimitiveType, verticesCount} = vao.layout.allocation;
        system.view.openGL.drawArrays(openGLPrimitiveType, 0, verticesCount);
    });
});
