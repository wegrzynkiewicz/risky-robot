import * as Binary from 'risky-robot-binary';
import * as Graphic from 'risky-robot-graphic';
import GLTFAsset from './GLTFAsset';
import accessorTypeTranslate from './accessorTypeTranlate';
import translateAttributeName from './translateAttributeName';

export default class GLTFAssetExtractor {

    constructor({gltfContent, view}) {
        this.gltfContent = gltfContent;
        this.view = view;

        this.images = [...gltfContent.referencedData.images];
        this.buffers = [...gltfContent.referencedData.buffers];
        this.accessors = [];
        this.meshes = [];
    }

    extractAsset() {
        const {gltfData} = this.gltfContent;

        for (const accessorNumber of Object.keys(gltfData.accessors) || []) {
            this.accessors.push(this.createAccessor(accessorNumber));
        }

        for (const meshNumber of Object.keys(gltfData.meshes) || []) {
            const mesh = this.createMesh(meshNumber);
            this.meshes.push(mesh);
        }

        const asset = new GLTFAsset({
            buffers: [...this.buffers],
            gltfData,
            images: [...this.images],
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
            if (primitive.attributes.POSITION === undefined) {
                throw new Error('Model have not (POSITION) attribute.');
            }
            const primitiveObject = this.createPrimitive(primitive);
            primitiveObjects.push(primitiveObject);
        }

        const mesh = new Graphic.Mesh({
            name,
            primitives: primitiveObjects,
            weights,
        });

        return mesh;
    }

    createPrimitive(primitiveData) {
        const {view} = this;
        const {material, mode} = primitiveData;

        const program = this.findCorrectProgram(primitiveData);
        const layout = this.createPrimitiveLayout(program, primitiveData);
        const verticesCount = layout.allocation.verticesCount;
        const attributeBuffers = this.createAttributeBuffers({layout,
            primitiveData});
        const indicesBuffer = this.createElementBuffer({layout,
            primitiveData});

        const vao = view.vaoManager.createVAO({
            attributeBuffers,
            indicesBuffer,
            layout,
            name: 'test',
            program,
        });

        const openGLPrimitiveType = mode || 4;
        const primitive = new Graphic.Primitive({
            material,
            openGLPrimitiveType,
            program,
            vao,
            verticesCount,
            view,
        });

        return primitive;
    }

    createAttributeBuffers({layout, primitiveData}) {
        const {attributes} = primitiveData;
        const count = layout.allocation.verticesCount;

        const attributeBuffers = [];
        for (const attributeBufferLayout of layout.attributeBufferLayouts) {
            const dataView = attributeBufferLayout.createDataView();
            for (const [attributeKey, accessorNumber] of Object.entries(attributes)) {
                try {
                    const attributeName = translateAttributeName(attributeKey);
                    const sourceAccessor = this.createAccessor(accessorNumber);
                    const attributeLayout = attributeBufferLayout.getAttributeLayoutByName(attributeName);
                    const destinationAccessor = attributeLayout.createAccessor({
                        count,
                        dataView,
                    });
                    destinationAccessor.copyFromAccessor(sourceAccessor);
                } catch (error) {
                    console.warn(error);
                }
            }
            const buffer = this.view.bufferManager.createArrayBuffer({
                bufferLayout: attributeBufferLayout,
                name: 'test',
                usage: WebGL2RenderingContext.STATIC_DRAW,
            });
            buffer.setBufferData(dataView);
            attributeBuffers.push(buffer);
        }

        return attributeBuffers;
    }

    createElementBuffer({layout, primitiveData}) {
        const {indices} = primitiveData;

        if (indices === undefined) {
            return null;
        }

        const dataView = layout.elementBufferLayout.createDataView();
        const sourceAccessor = this.createAccessor(indices);
        const count = sourceAccessor.count;
        const destinationAccessor = layout.elementBufferLayout.createAccessor({
            count,
            dataView,
        });
        destinationAccessor.copyFromAccessor(sourceAccessor);

        const indicesBuffer = this.view.bufferManager.createElementArrayBuffer({
            bufferLayout: layout.elementBufferLayout,
            name: 'test',
            usage: WebGL2RenderingContext.STATIC_DRAW,
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
            type: accessorType,
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
            byteOffset: bufferViewByteOffset + accessorByteOffset,
            byteStride,
            count,
            dataView,
            type,
        });

        return accessor;
    }

    createPrimitiveLayout(program, primitiveData) {
        const {attributes, indices, mode} = primitiveData;

        const attributeBlueprints = [];
        for (const [attributeKey, accessorNumber] of Object.entries(attributes)) {
            try {
                const attributeName = translateAttributeName(attributeKey);
                const attribute = program.getAttributeByName(attributeName);
                const sourceAccessor = this.createAccessor(accessorNumber);

                const attributeBlueprint = new Graphic.VAOLayoutBlueprint.Attribute({
                    location: attribute.location,
                    name: attributeName,
                    type: sourceAccessor.type,
                });

                attributeBlueprints.push(attributeBlueprint);
            } catch (error) {
                console.warn(error);
            }
        }

        const primaryBlueprint = new Graphic.VAOLayoutBlueprint.ArrayBuffer({
            batchBlueprints: [
                new Graphic.VAOLayoutBlueprint.AttributeBatch({
                    attributeBlueprints,
                }),
            ],
            name: 'primary',
        });
        const attributeBufferBlueprints = [primaryBlueprint];

        let elementBufferBlueprint = null;
        if (indices !== undefined) {
            elementBufferBlueprint = new Graphic.VAOLayoutBlueprint.ElementArrayBuffer({
                name: 'indices',
            });
        }

        const blueprint = new Graphic.VAOLayoutBlueprint({
            attributeBufferBlueprints,
            elementBufferBlueprint,
        });

        const indicesAccessorData = this.gltfContent.gltfData.accessors[indices];
        const indicesCount = indicesAccessorData === undefined ? 0 : indicesAccessorData.count;
        const positionAccessorData = this.gltfContent.gltfData.accessors[attributes.POSITION];
        const openGLPrimitiveType = mode || 4;
        const verticesCount = positionAccessorData.count;
        const layout = blueprint.createLayout({
            indicesCount,
            openGLPrimitiveType,
            verticesCount,
        });

        return layout;
    }

    findCorrectProgram() {
        // TODO: refactor
        return this.view.programManager.getProgramByName('solid');
    }
}
