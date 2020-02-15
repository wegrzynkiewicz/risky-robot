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
}
