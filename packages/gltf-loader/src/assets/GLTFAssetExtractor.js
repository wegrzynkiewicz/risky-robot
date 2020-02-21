import * as Graphic from "robo24-graphic";
import * as Binary from "robo24-binary";
import accessorTypeTranslate from "./accessorTypeTranlate";
import GLTFAsset from "./GLTFAsset";

export default class GLTFAssetExtractor {

    constructor({view, gltfContent}) {
        this.view = view;
        this.gltfContent = gltfContent;

        this.images = [...gltfContent.referencedData.images];
        this.buffers = [...gltfContent.referencedData.buffers];
        this.accessors = [];
        this.meshes = [];
    }

    async extractAsset() {
        const {gltfData} = this.gltfContent;

        for (const accessorNumber of Object.keys(gltfData.accessors) || []) {
            this.accessors.push(this.createAccessor(accessorNumber));
        }

        for (const meshNumber of Object.keys(gltfData.meshes) || []) {
            this.meshes.push(this.createMesh(meshNumber));
        }

        const asset = new GLTFAsset({
            gltfData,
            images: [...this.images],
            buffers: [...this.buffers],
            meshes: [...this.meshes],
        });

        return asset;
    }

    createSkin(skinNumber) {
        return undefined;
    }

    createMesh(meshNumber) {
        const meshData = this.gltfContent.gltfData.meshes[meshNumber];
        const {primitives, weights, name} = meshData;

        const primitiveObjects = [];
        for (const primitive of primitives) {
            if (primitive.attributes["POSITION"] === undefined) {
                return;
            }
            const primitiveObject = this.createPrimitive(primitive);
            primitiveObjects.push(primitiveObject);
        }

        const mesh = new Graphic.Mesh({
            name,
            primitives: primitiveObjects,
            weights
        });

        return mesh;
    }

    createPrimitive(primitiveData) {
        const {view} = this;
        const {material, mode} = primitiveData;

        const layout = this.createPrimitiveLayout(primitiveData);
        const verticesCount = layout.allocation.verticesCount;
        const attributeBuffers = this.createAttributeBuffers({layout, primitiveData});
        const indicesBuffer = this.createIndicesBuffer({layout, primitiveData});
        const program = this.findCorrectProgram(primitiveData);

        const vao = view.vaoManager.createVAO({
            name: "test",
            layout,
            program,
            attributeBuffers,
            indicesBuffer,
        });

        const openGLPrimitiveType = mode || 4;
        const primitive = new Graphic.Primitive({
            vao,
            view,
            program,
            material,
            verticesCount,
            openGLPrimitiveType,
        });

        return primitive;
    }

    createAttributeBuffers({layout, primitiveData}) {
        const {attributes} = primitiveData;
        const count = layout.allocation.verticesCount;
        const primaryBuffer = layout.getBufferLayout("primary");
        const dataView = primaryBuffer.createDataView();
        const attributeBuffers = [];

        for (const [attributeKey, accessorNumber] of Object.entries(attributes)) {
            const attributeName = this.translateAttributeName(attributeKey);
            const sourceAccessor = this.createAccessor(accessorNumber);
            const attributeLayout = primaryBuffer.getAttributeLayoutByName(attributeName);
            const destinationAccessor = attributeLayout.createAccessor({dataView, count});
            destinationAccessor.copyFromAccessor(sourceAccessor);

            const buffer = this.view.bufferManager.createArrayBuffer({
                name: "test",
                usage: WebGL2RenderingContext["STATIC_DRAW"],
                bufferLayout: primaryBuffer,
            });
            buffer.setBufferData(dataView);
            attributeBuffers.push(buffer);
        }

        return attributeBuffers;
    }

    createIndicesBuffer({layout, primitiveData}) {
        const {indices} = primitiveData;

        if (indices === undefined) {
            return null;
        }

        const indicesBufferLayout = layout.getBufferLayout("indices");
        const dataView = indicesBufferLayout.createDataView();
        const sourceAccessor = this.createAccessor(indices);
        const count = sourceAccessor.count;
        const destinationAccessor = indicesBufferLayout.createAccessor({dataView, count});
        destinationAccessor.copyFromAccessor(sourceAccessor);

        const indicesBuffer = this.view.bufferManager.createElementArrayBuffer({
            name: "test",
            usage: WebGL2RenderingContext["STATIC_DRAW"],
            bufferLayout: indicesBufferLayout,
        });
        indicesBuffer.setBufferData(dataView);

        return indicesBuffer;
    }

    /**
     * @return {Binary.TypeAccessor}
     */
    createAccessor(accessorNumber) {
        const accessorData = this.gltfContent.gltfData.accessors[accessorNumber];
        const {
            bufferView: bufferViewNumber,
            byteOffset: accessorByteOffset,
            componentType,
            count,
            type: accessorType
        } = accessorData;

        const bufferViewData = this.gltfContent.gltfData.bufferViews[bufferViewNumber];
        const {
            buffer: bufferNumber,
            byteOffset: bufferViewByteOffset,
            byteStride,
        } = bufferViewData;

        const typeName = accessorTypeTranslate(accessorType, componentType);
        const type = Binary.types.resolve(typeName);

        const dataView = new DataView(this.buffers[bufferNumber].data);

        const accessor = new Binary.TypeListAccessor({
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

    createPrimitiveLayout(primitiveData) {
        const {attributes, indices, mode} = primitiveData;

        const attributeBlueprints = [];
        for (const [attributeKey, accessorNumber] of Object.entries(attributes)) {
            const attributeName = this.translateAttributeName(attributeKey);
            const sourceAccessor = this.createAccessor(accessorNumber);

            const attributeBlueprint = new Graphic.VAOLayoutBlueprint.Attribute({
                name: attributeName,
                type: sourceAccessor.type,
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

        if (indices !== undefined) {
            const indicesBlueprint = new Graphic.VAOLayoutBlueprint.ElementArrayBuffer({
                name: "indices",
            });
            buffers.push(indicesBlueprint);
        }

        const blueprint = new Graphic.VAOLayoutBlueprint({buffers});

        const indicesAccessorData = this.gltfContent.gltfData.accessors[indices];
        const indicesCount = indicesAccessorData === undefined ? 0 : indicesAccessorData.count;
        const positionAccessorData = this.gltfContent.gltfData.accessors[attributes["POSITION"]];
        const openGLPrimitiveType = mode || 4;
        const verticesCount = positionAccessorData.count;
        const layout = blueprint.createLayout({openGLPrimitiveType, verticesCount, indicesCount});

        return layout;
    }

    findCorrectProgram() {
        return this.view.programManager.getProgramByName("solid"); // TODO: refactor
    }
}
