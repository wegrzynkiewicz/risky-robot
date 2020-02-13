import * as Frontend from "robo24-frontend";

document.addEventListener("DOMContentLoaded", async () => {
    const canvas = document.getElementById("canvas");
    const config = JSON.parse(document.getElementById("config").innerHTML);
    const system = Frontend.createBasicSystem({window, canvas});

    const format = config["suiteName"].indexOf("binary") === -1 ? "gltf" : "glb";
    const resource = new Frontend.Assets.Resource({
        vendor: "@base",
        mimeType: "model/gltf+json",
        uri: `${config["suiteName"]}/${config["baseName"]}.${format}`,
    });

    const asset = await system.gltfManager.load(resource);
    const scene = asset.getScene(0);

    scene.debug(console.log);
});
