import * as Frontend from "robo24-frontend";
import vertexShaderContent from "./shader.vert";
import fragmentShaderContent from "./shader.frag";
import {Graphic} from "robo24-frontend";

const start = async () => {
    const canvas = document.getElementById("canvas");
    const config = JSON.parse(document.getElementById("config").innerHTML);
    const system = Frontend.createBasicSystem({window, canvas});

    const format = config["suiteName"].indexOf("binary") === -1 ? "gltf" : "glb";
    const resource = new Frontend.Assets.Resource({
        vendor: "@base",
        url: `/visual-diff/dataset/${config["suiteName"]}/model.${format}`,
    });

    const {gltfManager, view} = system;

    const programFactory = new Frontend.Graphic.ContentProgramFactory({view});
    window.program = programFactory.createProgram({
        name: "solid",
        fragment: fragmentShaderContent,
        vertex: vertexShaderContent,
    });

    window.program2 = programFactory.createProgram({
        name: "solid2",
        fragment: fragmentShaderContent,
        vertex: vertexShaderContent,
    });

    const modelMatrix = Graphic.Matrix4.create();

    const uniformBlock = program.getUniformBlockByName("Matrices");

    const uniformBuffer = view.uniformBufferManager.createUniformBuffer({
        name: "Matrices",
        usage: WebGL2RenderingContext['STREAM_DRAW'],
    });

    const uniformBindingPoint = view.uniformBlockManager.createBindingPoint({
        blockName: "Matrices",
        uniformBuffer,
    });
    uniformBlock.setUniformBindingPoint(uniformBindingPoint);

    const bufferData = uniformBlock.createBufferData();

    const projectionMatrix = Graphic.Matrix4.create();
    const viewMatrix = Graphic.Matrix4.create();

    Graphic.Matrix4.ortho(projectionMatrix, -500, 500, 500, -500, -500, 500);
    bufferData.accessor.fields['u_projectionMatrix'].write(projectionMatrix);
    bufferData.accessor.fields['u_viewMatrix'].write(viewMatrix);
    bufferData.accessor.fields['u_modelMatrix'].write(modelMatrix);

    uniformBuffer.setBufferData(bufferData.dataView);

    const gltfContent = await gltfManager.loadContent(resource);
    const asset = await gltfManager.extractAsset({view, gltfContent});

    const sceneNode = asset.createScene(0);
    const primaryScene = system.view.sceneManager.find(n => n.name === "primary-scene");
    sceneNode.setParent(primaryScene);

    window.bufferData = bufferData;
    window.uniformBuffer = uniformBuffer;

    let x = 0;
    let y = 0;

    system.animationLoop.on("frame", (deltaTime) => {
        x += 80 * deltaTime;
        y += 20 * deltaTime;
        Graphic.Matrix4.identity(viewMatrix);
        // Graphic.Matrix4.translate(modelMatrix, modelMatrix, [0.5, 0.5, 0]);
        Graphic.Matrix4.rotateX(viewMatrix, viewMatrix, Graphic.radian(x));
        Graphic.Matrix4.rotateY(viewMatrix, viewMatrix, Graphic.radian(y));
        // Graphic.Matrix4.lookAt(modelMatrix, [1, 1, 1], [0, 0, 0], [0, 1, 0]);
        bufferData.accessor.fields['u_viewMatrix'].write(viewMatrix);
        uniformBuffer.setBufferData(bufferData.dataView);

    });

    Frontend.Graphic.printSceneNode(system.view.sceneManager);
};

document.addEventListener("DOMContentLoaded", () => setImmediate(start));
