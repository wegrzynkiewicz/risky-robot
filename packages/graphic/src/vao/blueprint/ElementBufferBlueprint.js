export default class ElementBufferBlueprint {

    constructor({name}) {
        this.name = name;
        this.glBufferType = WebGLRenderingContext['ELEMENT_ARRAY_BUFFER'];
        this.glBufferTypeName = 'ELEMENT_ARRAY_BUFFER';
    }

    createBufferLayout({allocation}) {

        return undefined;
    }
}
