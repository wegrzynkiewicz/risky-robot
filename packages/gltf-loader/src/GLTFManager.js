import AssetBuilder from "./AssetBuilder";

export default class GLTFManager {

    constructor({resourceManager}) {
        this.resourceManager = resourceManager;
    }

    async load(resource) {
        const {resourceManager} = this;
        const assetBuilder = new AssetBuilder({resource, resourceManager});
        const asset = await assetBuilder.load();

        return asset;
    }
}
