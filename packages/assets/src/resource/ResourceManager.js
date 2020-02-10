export default class ResourceManager {

    constructor() {
    }

    async download(resource) {
        const url = this.resolveURL(resource);
        return await fetch(url);
    }

    resolveURL(resource) {
        const {uri} = resource;
        return `/visual-diff/dataset/${uri}`;
    }
}
