
/**
 * @property tragedia
 */
class Chunk {
    constructor(options) {
        this.dataView = options['dataView'];
    }
}

Descriptor.register(Chunk, {
    name: "Chunk",
    properties: [
        {type: "u8", property: "type"},
        {type: "u8[8]", property: "blockBitWidth"},
        {type: "vec3<u16>[4]", property: "position"},
        {type: "mat4<f32>", property: "modelViewMatrix"},
        {type: "u16", property: "blockDataOffset"},
        {type: "u16", property: "blockIndexDataOffset"},
        {type: "u16", property: "terrainDataOffset"},
        {type: "u16", property: "additionalDataOffset"},
        {type: "u16", property: "overrideDataOffset"},
        {type: "u16", property: "blockDataSize"},
        {type: "u16", property: "blockIndexDataSize"},
        {type: "u16", property: "terrainDataSize"},
        {type: "u16", property: "additionalDataSize"},
        {type: "u16", property: "overrideDataSize"},
        {type: "blob"},
        {type: "blob", property: "blockData"},
        {type: "blob", property: "blockIndexData"},
        {type: "blob", property: "terrainData"},
        {type: "blob", property: "additionalData"},
        {type: "blob", property: "overrideData"},
    ],
});

console.log(Descriptor);

const buffer = new ArrayBuffer(1000);
const dataView = new DataView(buffer, 0);
dataView.setInt8(0, 0xff);

const chunk = new Chunk({dataView});

chunk.get = function (propertyName) {
    const property = this.description[propertyName];

    if (property === undefined) {
        throw new Error(`Cannot get property (${propertyName})`);
    }

    return property.getValue(this);
};

chunk.position.index(3).x.read(chunk);


chunk.getIndex("position", 2).set(48);
console.log(buffer);
