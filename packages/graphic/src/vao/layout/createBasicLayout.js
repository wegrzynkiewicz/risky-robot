import ArrayBufferBlueprint from "../blueprint/ArrayBufferBlueprint";
import AttributeBatchBlueprint from "../blueprint/AttributeBatchBlueprint";
import AttributeBlueprint from "../blueprint/AttributeBlueprint";
import ElementBufferBlueprint from "../blueprint/ElementBufferBlueprint";
import VAOLayoutBlueprint from "../blueprint/VAOLayoutBlueprint";

export default function createBasicLayout({openGLPrimitiveType, verticesCount, indicesCount, attributes}) {

    const batchesMap = {};
    for (const {buffer: bufferName, batch: batchNumber, ...attributeOptions} of attributes) {
        const attributeBlueprint = new AttributeBlueprint(attributeOptions);
        const key = `${bufferName}_${batchNumber}`;
        batchesMap[key] = batchesMap[key] || {name: bufferName, attributes: []};
        batchesMap[key].attributes.push(attributeBlueprint);
    }

    const buffersMap = {};
    for (const {name, attributes} of Object.values(batchesMap)) {
        const batchBlueprint = new AttributeBatchBlueprint({attributes});
        buffersMap[name] = batchesMap[name] || {name, batches: []};
        buffersMap[name].batches.push(batchBlueprint);
    }

    const buffers = [];
    for (const {name, batches} of Object.values(buffersMap)) {
        const bufferBlueprint = new ArrayBufferBlueprint({name, batches});
        buffers.push(bufferBlueprint);
    }

    if (!isNaN(parseInt(indicesCount))) {
        const indicesBuffer = new ElementBufferBlueprint({
            name: "indices",
        });
        buffers.push(indicesBuffer);
    }

    const blueprint = new VAOLayoutBlueprint({buffers});
    const layout = blueprint.createLayout({openGLPrimitiveType, verticesCount, indicesCount});

    return layout;
}
