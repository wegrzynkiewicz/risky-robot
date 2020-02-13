import * as Graphic from "robo24-graphic";

export default class Asset {

    constructor({gltfData}) {
        if (!gltfData) {
            throw new Error("Invalid GLTF data.");
        }
        this.gltfData = gltfData;
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
        const {
            camera, // TODO: support camera
            children,
            matrix,
            mesh,
            name,
            rotation,
            scale,
            skin,
            translation,
            weights,
            extensions,
            extras
        } = this.gltfData.nodes[nodeNumber];

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

        if (skin) {
            this.createSkin(skin);
        }

        if (mesh) {
            this.createMesh(mesh);
        }

        return sceneNode;
    }

    createSkin(skinNumber) {
        return undefined;
    }

    createMesh(meshNumber) {
        return undefined;
    }
}
