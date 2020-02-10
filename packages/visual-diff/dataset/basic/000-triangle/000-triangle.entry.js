import * as Frontend from "robo24-frontend";

import triangleVertex from "./triangle.vert";
import triangleFragment from "./triangle.frag";

const {Graphic} = Frontend;

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const system = Frontend.createBasicSystem({window, canvas});

    const {view, sceneManager} = system;

    const vaoLayout = Graphic.VAOLayout.createBasicLayout({
        primitive: "triangle",
        elementsCount: 1,
        indices: false,
        attributes: [
            {buffer: "primary", batch: 0, name: "a_VertexPosition", type: "vec3<f32>"},
        ],
    });

    const bufferLayout = vaoLayout.getBufferLayout("primary");
    const dataView = bufferLayout.createDataView();
    const positionAccessor = bufferLayout.getAccessorByName("a_VertexPosition");

    positionAccessor.write(dataView, 0, [-0.5, -0.5, 0]);
    positionAccessor.write(dataView, 1, [0.5, -0.5, 0]);
    positionAccessor.write(dataView, 2, [-0.5, 0.5, 0]);

    const {bufferManager, vaoManager, programManager} = view;

    const buffer = bufferManager.createBuffer({
        name: "triangle",
        type: "ARRAY_BUFFER",
        bufferLayout
    });

    buffer.setDataView(dataView);

    programManager.registerShaderContent("triangle", triangleVertex, triangleFragment);
    const program = programManager.getProgramByName("triangle");

    const vao = vaoManager.createVAO({
        name: "triangle",
        program,
        vaoLayout,
        buffers: [buffer],
    });

    const triangleSceneNode = new Graphic.ModelSceneNode({});
    const primaryScene = sceneManager.getSceneNodeByName("primary-scene");
    triangleSceneNode.setParent(primaryScene);

    system.animationLoop.on("frame", () => {
        program.use();
        vao.bind();
        const {openGLPrimitiveType, verticesCount} = vao.vaoLayout.allocation;
        system.view.openGL.drawArrays(openGLPrimitiveType, 0, verticesCount);
    });
});
