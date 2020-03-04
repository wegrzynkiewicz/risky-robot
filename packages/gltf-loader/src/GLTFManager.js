import GLTFAssetExtractor from './assets/GLTFAssetExtractor';
import GLTFContentLoader from './content/GLTFContentLoader';

export default class GLTFManager {

    constructor({resourceManager}) {
        this.resourceManager = resourceManager;
        this.contents = new Map();
    }

    async loadContent(resource) {
        const {resourceManager} = this;

        const gltfContentLoader = new GLTFContentLoader({
            resource,
            resourceManager,
        });
        const gltfContent = await gltfContentLoader.load();

        this.contents.set(resource.url, gltfContent);

        return gltfContent;
    }

    async extractAsset({view, gltfContent}) {
        const gltfAssetExtractor = new GLTFAssetExtractor({
            gltfContent,
            view,
        });
        const asset = await gltfAssetExtractor.extractAsset();

        return asset;
    }
}
