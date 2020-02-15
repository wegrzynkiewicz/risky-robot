import * as Graphic from "robo24-graphic";
import accessorTypeTranslate from "./accessorTypeTranlate";
import * as Binary from "robo24-binary";

export default class AssetModelExtractor {

    constructor({gltfData, referencedData, resource, bufferManager}) {
        this.gltfData = gltfData;
        this.resource = resource;
        this.images = referencedData.images;
        this.buffers = referencedData.buffers;
        this.accessors = [];
        this.meshes = [];
    }

    async extract() {
        const {gltfData} = this;

        for (const accessorNumber of Object.keys(gltfData.accessors) || []) {
            this.accessors.push(this.createAccessor(accessorNumber));
        }

        for (const meshNumber of Object.keys(gltfData.meshes) || []) {
            this.meshes.push(this.createMesh(meshNumber));
        }
    }

    createSkin(skinNumber) {
        return undefined;
    }

    createMesh(meshNumber) {
        let meshData = this.gltfData.meshes[meshNumber];
        let {primitives, weights, name} = meshData;

        primitives = primitives.map(this.createPrimitive, this);

        const mesh = new Graphic.Mesh({name, primitives, weights});

        return mesh;
    }

    createPrimitive(primitiveData) {
        const {attributes, indices, material, mode, targets} = primitiveData;

        if (!attributes["POSITION"]) {
            return;
        }

        const layout = this.createLayout(primitiveData);
        const count = layout.allocation.verticesCount;
        const primaryBuffer = layout.getBufferLayout("primary");
        const dataView = primaryBuffer.createDataView();

        for (const [attributeKey, accessorNumber] of Object.entries(attributes)) {
            const attributeName = this.translateAttributeName(attributeKey);
            const sourceAccessor = this.createAccessor(accessorNumber);
            const attributeLayout = primaryBuffer.getAttributeLayoutByName(attributeName);
            const destinationAccessor = attributeLayout.createAccessor({dataView, count});

            for (let i = 0; i < count; i++) {
                const typedArray = sourceAccessor.getTypedArray(i);
                destinationAccessor.write(i, typedArray);
            }
        }

        if (indices) {
            const indicesBuffer = layout.getBufferLayout("indices");
            const dataView = indicesBuffer.createDataView();
            const sourceAccessor = this.createAccessor(indices);
            const count = sourceAccessor.count;
            const destinationAccessor = indicesBuffer.createAccessor({dataView, count});

            for (let i = 0; i < count; i++) {
                const value = sourceAccessor.read(i);
                destinationAccessor.write(i, value);
            }
        }

        const primitive = new Graphic.Primitive({vao, material});
    }

    /**
     * @return {Accessor}
     */
    createAccessor(accessorNumber) {
        const accessorData = this.gltfData.accessors[accessorNumber];
        const {
            bufferView: bufferViewNumber,
            byteOffset: accessorByteOffset,
            componentType,
            count,
            type: accessorType
        } = accessorData;

        const bufferViewData = this.gltfData.bufferViews[bufferViewNumber];
        const {
            buffer: bufferNumber,
            byteOffset: bufferViewByteOffset,
            byteLength: bufferViewByteLength,
            byteStride,
        } = bufferViewData;

        const typeName = accessorTypeTranslate(accessorType, componentType);
        const type = Binary.types.getTypeByName(typeName);

        const dataView = new DataView(this.buffers[bufferNumber].data);

        const accessor = new Binary.Accessor({
            type,
            count,
            dataView,
            byteOffset: bufferViewByteOffset + accessorByteOffset,
            byteStride,
        });

        return accessor;
    }

    translateAttributeName(attributeKey) {
        const map = {
            "POSITION": "a_Position",
            "NORMAL": "a_Normal",
            "TANGENT": "a_Tangent",
            "TEXCOORD_0": "a_TexCoords",
            "COLOR_0": "a_Color",
            "JOINTS_0": "a_Joints",
            "WEIGHTS_0": "a_Weights",
        };

        const mapped = map[attributeKey];

        if (mapped === undefined) {
            throw new Error(`Not supported attribute name (${attributeKey}).`);
        }

        return mapped;
    }

    createLayout(primitiveData) {
        const {attributes, indices, mode} = primitiveData;

        const attributeBlueprints = [];
        for (const [attributeKey, accessorNumber] of Object.entries(attributes)) {
            const attributeName = this.translateAttributeName(attributeKey);
            const sourceAccessor = this.createAccessor(accessorNumber);

            const attributeBlueprint = new Graphic.VAOLayoutBlueprint.Attribute({
                name: attributeName,
                type: sourceAccessor.type.typeName
            });

            attributeBlueprints.push(attributeBlueprint);
        }

        const buffers = [];
        const primaryBlueprint = new Graphic.VAOLayoutBlueprint.ArrayBuffer({
            name: "primary",
            batches: [
                new Graphic.VAOLayoutBlueprint.AttributeBatch({
                    attributes: attributeBlueprints,
                }),
            ],
        });
        buffers.push(primaryBlueprint);

        if (indices) {
            const indicesBlueprint = new Graphic.VAOLayoutBlueprint.ElementArrayBuffer({
                name: "indices",
            });
            buffers.push(indicesBlueprint);
        }

        const blueprint = new Graphic.VAOLayoutBlueprint({buffers});

        const positionAccessorData = this.gltfData.accessors[attributes["POSITION"]];
        const openGLPrimitiveType = mode || 4;
        const verticesCount = positionAccessorData.count;
        const layout = blueprint.createLayout({openGLPrimitiveType, verticesCount});

        return layout;
    }
}
