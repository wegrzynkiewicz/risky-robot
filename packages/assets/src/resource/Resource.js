export default class Resource {

    constructor({vendor, version, mimeType, url}) {
        this.vendor = vendor;
        this.mimeType = mimeType;
        this.version = version;
        this.url = url;
    }
}
