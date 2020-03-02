import path from 'path';

const DOT_POSITION = 1;

export default class Resource {

    constructor({vendor, version, url}) {
        this.vendor = vendor;
        this.extension = path.extname(url).substr(DOT_POSITION);
        this.version = version;
        this.url = url;
    }
}
