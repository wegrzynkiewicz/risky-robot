import AssetResourceLoader from "./AssetResourceLoader";
import AssetModelExtractor from "./AssetModelExtractor";

export default class GLTFManager {

    constructor({resourceManager}) {
        this.resourceManager = resourceManager;
    }

    async load(resource) {
        const {resourceManager} = this;

        const assetResourceLoader = new AssetResourceLoader({resource, resourceManager});
        const {gltfData, referencedData} = await assetResourceLoader.load();

        const assetModelExtractor = new AssetModelExtractor({gltfData, resource, referencedData});
        const assetx = await assetModelExtractor.extract();

        return asset;
    }
}
