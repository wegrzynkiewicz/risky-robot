import * as Assets from "robo24-assets";
import GLTFContent from "./GLTFContent";

export default class GLTFContentLoader {

    constructor({resource, resourceManager}) {
        this.resource = resource;
        this.resourceManager = resourceManager;
        this.resourceURL = this.resourceManager.resolveURL(this.resource);
    }

    async load() {
        if (this.resource.extension === "gltf") {
            return this.loadJSON();
        } else if (this.resource.extension === "glb") {
            return this.loadBinary();
        } else {
            throw new Error("Unknown GLTF format. Unknown MimeType.")
        }
    }

    async loadJSON() {
        const {resource, resourceManager} = this;
        const response = await resourceManager.download(resource);
        const gltfData = await response.json();
        const referencedData = await this.extractData(gltfData);

        const content = new GLTFContent({resource, gltfData, referencedData});
        return content;
    }

    async loadBinary() {
        const response = await this.resourceManager.download(this.resource);
        const binaryData = await response.arrayBuffer();
    }

    async extractData(gltfData) {

        const referencedObjectsMap = {
            buffers: [],
            images: [],
        };

        const promises = [];
        for (const [referencedListName, referencedList] of Object.entries(referencedObjectsMap)) {
            const referencedGLTFData = gltfData[referencedListName] || [];
            for (const referencedData of referencedGLTFData) {
                const referencedObject = {
                    data: null,
                    resource: null
                };
                referencedList.push(referencedObject);
                const promise = this.loadReferencedData(referencedData, referencedObject);
                promises.push(promise);
            }
        }

        await Promise.all(promises);

        return referencedObjectsMap;
    }

    async loadReferencedData(referencedData, referencedObject) {
        const {uri} = referencedData;
        const url = (new URL(uri, this.resourceURL.href)).href;

        const resource = new Assets.Resource({
            vendor: this.resource.vendor,
            url,
        });
        referencedObject.resource = resource;

        const response = await this.resourceManager.download(resource);
        const data = await response.arrayBuffer();
        referencedObject.data = data;
    }
}
