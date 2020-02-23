import ArrayBufferBlueprint from "../blueprint/ArrayBufferBlueprint";
import AttributeBatchBlueprint from "../blueprint/AttributeBatchBlueprint";
import AttributeBlueprint from "../blueprint/AttributeBlueprint";
import ElementBufferBlueprint from "../blueprint/ElementBufferBlueprint";
import VAOLayoutBlueprint from "../blueprint/VAOLayoutBlueprint";

export default function createBasicLayout({attributes, openGLPrimitiveType, verticesCount, indicesCount}) {

    const batchesMap = {};
    for (const {buffer: bufferName, batch: batchNumber, ...attributeOptions} of attributes) {
        const attributeBlueprint = new AttributeBlueprint(attributeOptions);
        const key = `${bufferName}_${batchNumber}`;
        batchesMap[key] = batchesMap[key] || {name: bufferName, attributeBlueprints: []};
        batchesMap[key].attributeBlueprints.push(attributeBlueprint);
    }

    const buffersMap = {};
    for (const {name, attributeBlueprints} of Object.values(batchesMap)) {
        const batchBlueprint = new AttributeBatchBlueprint({attributeBlueprints});
        buffersMap[name] = batchesMap[name] || {name, batchBlueprints: []};
        buffersMap[name].batchBlueprints.push(batchBlueprint);
    }

    const attributeBufferBlueprints = [];
    for (const {name, batchBlueprints} of Object.values(buffersMap)) {
        const bufferBlueprint = new ArrayBufferBlueprint({name, batchBlueprints});
        attributeBufferBlueprints.push(bufferBlueprint);
    }

    let elementBufferLayout = null;
    indicesCount = parseInt(indicesCount);
    if (!isNaN(indicesCount) && indicesCount > 0) {
        elementBufferLayout = new ElementBufferBlueprint({
            name: "indices",
        });
    }

    const blueprint = new VAOLayoutBlueprint({
        attributeBufferBlueprints,
        elementBufferLayout,
    });

    const layout = blueprint.createLayout({
        openGLPrimitiveType,
        verticesCount,
        indicesCount
    });

    return layout;
}
