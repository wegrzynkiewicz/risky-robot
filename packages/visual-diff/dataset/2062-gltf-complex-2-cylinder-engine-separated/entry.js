import * as Frontend from "robo24-frontend";
import vertexShaderContent from "../../common/shaders/solid.vert";
import fragmentShaderContent from "../../common/shaders/solid.frag";

document.addEventListener("DOMContentLoaded", async () => {
    const canvas = document.getElementById("canvas");
    const config = JSON.parse(document.getElementById("config").innerHTML);
    const system = Frontend.createBasicSystem({window, canvas});

    const format = config["suiteName"].indexOf("binary") === -1 ? "gltf" : "glb";
    const resource = new Frontend.Assets.Resource({
        vendor: "@base",
        mimeType: "model/gltf+json",
        url: `/visual-diff/dataset/${config["suiteName"]}/model.${format}`,
    });

    const {gltfManager, view} = system;
    view.programManager.registerShaderContent("solid", vertexShaderContent, fragmentShaderContent);

    const gltfContent = await gltfManager.loadContent(resource);
    const asset = await gltfManager.extractAsset({view, gltfContent});

    const sceneNode = asset.createScene(0);
    const primaryScene = system.view.sceneManager.find(n => n.name === "primary-scene");
    sceneNode.setParent(primaryScene);

    const node = sceneNode.children[0];

    Frontend.Graphic.printSceneNode(system.view.sceneManager);

    console.log(node);

    system.animationLoop.on("frame", () => {
        node.target.primitives[0].program.use();
        const vao = node.target.primitives[0].vao;
        vao.bind();
        const {openGLPrimitiveType, verticesCount} = vao.layout.allocation;
        // openGL.uniform1iv(program.uniformLocations['textureSampler']);
        system.view.openGL.drawArrays(openGLPrimitiveType, 0, verticesCount);
    });
});
