import GLTFContentLoader from './content/GLTFContentLoader';
import GLTFAssetExtractor from './assets/GLTFAssetExtractor';

export default class GLTFManager {

    constructor({resourceManager}) {
        this.resourceManager = resourceManager;
        this.contents = new Map();
    }

    async loadContent(resource) {
        const {resourceManager} = this;

        const gltfContentLoader = new GLTFContentLoader({resource, resourceManager});
        const gltfContent = await gltfContentLoader.load();

        this.contents.set(resource.url, gltfContent);

        return gltfContent;
    }

    async extractAsset({view, gltfContent}) {
        const gltfAssetExtractor = new GLTFAssetExtractor({view, gltfContent});
        const asset = await gltfAssetExtractor.extractAsset();

        return asset;
    }
}
