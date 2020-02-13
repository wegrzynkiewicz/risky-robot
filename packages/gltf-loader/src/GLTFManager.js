import Asset from "./Asset";

export default class GLTFManager {

    constructor({resourceManager}) {
        this.resourceManager = resourceManager;
    }

    async load(resource) {
        const response = await this.resourceManager.download(resource);
        if (resource.mimeType === "model/gltf+json") {
            const gltfData = await response.json();
            const asset = new Asset({gltfData});
            return asset;
        } else if (resource.mimeType === "model/gltf-binary") {

        }
    }
}
