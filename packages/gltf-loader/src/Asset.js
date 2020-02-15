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

        const bufferBlueprint = new VAOLayoutBlueprint.ArrayBuffer({
            batches: [
                new VAOLayoutBlueprint.AttributeBatch({
                    attributes: [
                        new VAOLayoutBlueprint.Attribute({
                            name: "a_VertexPosition",
                            type: "vec3<f32>"
                        }),
                        new VAOLayoutBlueprint.Attribute({
                            name: "a_VertexTexCoords",
                            type: "vec2<f32>"
                        }),
                    ],
                }),
            ]
        });

        for (const [attributeKey, accessorNumber] of Object.entries(attributes)) {
            const attributeName = this.translateAttributeName(attributeKey);
            const accessor = this.createAccessor(accessorNumber);
        }
    }

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
            "POSITION": "a_VertexPosition",
            "NORMAL": "a_VertexNormal",
            "TANGENT": "a_VertexTangent",
            "TEXCOORD_0": "a_VertexTextureCoords",
            "COLOR_0": "a_VertexColor",
            "JOINTS_0": "a_VertexJoints",
            "WEIGHTS_0": "a_VertexWeights",
        };

        const mapped = map[attributeKey];

        if (mapped === undefined) {
            throw new Error(`Not supported attribute name (${attributeKey}).`);
        }

        return mapped;
    }
}


class Accessor {

    constructor({arrayBuffer, type, count, byteOffset, byteStride}) {
        this.arrayBuffer = arrayBuffer;
        this.type = type;
        this.count = count;
        this.byteOffset = byteOffset;
        this.byteStride = byteStride;
    }

    calculateOffset(index) {
        return this.byteOffset + (this.byteStride * index);
    }

    write(dataView, index, source) {
        const offset = this.calculateOffset(index);
        this.type.write(dataView, offset, source);
    }

    read(dataView, index, destination) {
        const offset = this.calculateOffset(index);
        return this.type.read(dataView, offset, destination);
    }
}
