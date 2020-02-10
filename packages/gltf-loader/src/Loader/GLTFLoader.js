export default class GLTFLoader {

    constructor({resourceManager}) {
        this.resourceManager = resourceManager;
    }

    async download(resource) {
        const resourceData = await this.resourceManager.download(resource);

    }
}
