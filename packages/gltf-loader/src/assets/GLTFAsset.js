import * as Graphic from 'robo24-graphic';

export default class GLTFAsset {

    constructor({gltfData, meshes, buffers, images}) {
        this.gltfData = gltfData;
        this.meshes = meshes;
        this.images = images;
        this.buffers = buffers;
    }

    createScene(sceneNumber) {
        const scene = this.gltfData.scenes[sceneNumber];
        const {nodes} = scene;
        const sceneNode = new Graphic.SceneNode({
            name: `GLTFScene/${sceneNumber}`,
        });
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
            weights,
        } = node;

        let target = null;

        if (meshNumber !== undefined) {
            target = this.meshes[meshNumber];
        }

        const sceneNode = new Graphic.SceneNode({name, target});

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

        return sceneNode;
    }
}
