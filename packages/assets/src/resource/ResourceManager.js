export default class ResourceManager {

    constructor({window}) {
        this.window = window;
    }

    async download(resource) {
        const url = this.resolveURL(resource);
        return await fetch(url);
    }

    resolveURL(resource) {
        const {url} = resource;
        const resourceURL = new URL(url, this.window.location.href);

        return resourceURL;
    }
}
