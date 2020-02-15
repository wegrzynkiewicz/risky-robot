export default class ArrayBufferLayout {

    constructor({name, byteLength}) {
        this.name = name;
        this.byteLength = byteLength;
        this.attributeBatchLayoutSet = new Set();
        this.openGLBufferType = WebGL2RenderingContext["ARRAY_BUFFER"];
        this.openGLBufferTypeName = "ARRAY_BUFFER";
    }

    getAttributeLayouts() {
        const attributeLayouts = [];
        for (const attributeBatchLayout of this.attributeBatchLayoutSet.values()) {
            for (const attributeLayout of attributeBatchLayout.attributeLayoutMap.values()) {
                attributeLayouts.push(attributeLayout);
            }
        }
        return attributeLayouts;
    }

    createAccessor({name, dataView}) {
        try {
            const attributeLayout = this.getAttributeLayoutByName(name);
            return attributeLayout.createAccessor(dataView);
        } catch (error) {
            throw new Error(`Not found Accessor named (${accessorName})`);
        }
    }

    getAttributeLayoutByName(attributeLayoutName) {
        for (const {attributeLayoutMap} of this.attributeBatchLayoutSet.values()) {
            if (attributeLayoutMap.has(attributeLayoutName)) {
                return attributeLayoutMap.get(attributeLayoutName);
            }
        }
        throw new Error(`Not found AttributeLayout named (${attributeLayoutName})`);
    }

    createDataView() {
        const buffer = new ArrayBuffer(this.byteLength);
        const dataView = new DataView(buffer);

        return dataView;
    }
}
