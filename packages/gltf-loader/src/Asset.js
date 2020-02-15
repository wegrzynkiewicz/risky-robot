import * as Graphic from "robo24-graphic";
import * as Binary from "robo24-binary";
import VAOLayoutBlueprint from "../../graphic/src/vao/blueprint/VAOLayoutBlueprint";
import accessorTypeTranslate from "./accessorTypeTranlate";

export default class Asset {

    constructor({gltfData, referencedData}) {
        if (!gltfData) {
            throw new Error("Invalid GLTF data.");
        }
        this.gltfData = gltfData;
        this.referencedData = referencedData;
    }

    getScene(sceneNumber) {
        const scene = this.createScene(sceneNumber);
        return scene;
    }

    createScene(sceneNumber) {
        const scene = this.gltfData.scenes[sceneNumber];
        const {nodes} = scene;
        const sceneNode = new Graphic.SceneNode({name: `GLTFScene/${sceneNumber}`});
        for (const nodeNumber of nodes) {
            const node = this.createSceneNode(nodeNumber);
            node.setParent(sceneNode);
        }
        return sceneNode;
    }

    createSceneNode(nodeNumber) {
        let node = this.gltfData.nodes[nodeNumber];
        let {
            camera,
            children,
            matrix,
            mesh: meshNumber,
            name,
            rotation,
            scale,
            skin,
            translation,
            weights
        } = node;

        const sceneNode = new Graphic.SceneNode({name});

        if (children && children.length > 0) {
            for (const childNodeNumber of children) {
                const childNode = this.createSceneNode(childNodeNumber);
                childNode.setParent(sceneNode);
            }
        }

        const {transformation} = sceneNode;
        if (matrix) {
            transformation.decompose(matrix);
        } else {
            if (translation) {
                transformation.translation.set(translation);
            }
            if (rotation) {
                transformation.rotation.set(rotation);
            }
            if (scale) {
                transformation.scale.set(scale);
            }
            transformation.updateLocalMatrix();
        }

        if (skin !== undefined) {
            this.createSkin(skin);
        }

        if (meshNumber !== undefined) {
            this.createMesh(meshNumber);
        }

        return sceneNode;
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

        const blueprint = new VAOLayoutBlueprint({
            buffers: [
                new VAOLayoutBlueprint.ArrayBuffer({
                    name: "primary",
                    batches: [
                        new VAOLayoutBlueprint.AttributeBatch({
                            attributes: [
                                new VAOLayoutBlueprint.Attribute({
                                    name: "a_Position",
                                    type: "vec3<f32>"
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        });

        const positionAccessorData = this.gltfData.accessors[attributes["POSITION"]];
        const openGLPrimitiveType = mode || 4;
        const verticesCount = positionAccessorData.count;
        const layout = blueprint.createLayout({openGLPrimitiveType, verticesCount});

        for (const [attributeKey, accessorNumber] of Object.entries(attributes)) {
            const attributeName = this.translateAttributeName(attributeKey);
            const accessor = this.createAccessor(accessorNumber);


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

        const dataView = new DataView(this.referencedData.buffers[bufferNumber].data);

        const accessor  = new Binary.Accessor({
            type,
            count,
            dataView,
            byteOffset: bufferViewByteOffset + accessorByteOffset,
            byteStride,
        });

        return accessor;
    }

    createBuffer(bufferNumber) {
        return undefined;
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
}
