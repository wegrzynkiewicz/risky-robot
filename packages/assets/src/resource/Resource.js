import path from 'path';

export default class Resource {

    constructor({vendor, version, url}) {
        this.vendor = vendor;
        this.extension = path.extname(url).slice(1);
        this.version = version;
        this.url = url;
    }
}
