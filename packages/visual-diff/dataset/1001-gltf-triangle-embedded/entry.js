import * as Frontend from 'robo24-frontend';
import vertexShaderContent from '../../common/shaders/solid.vert';
import fragmentShaderContent from '../../common/shaders/solid.frag';

document.addEventListener('DOMContentLoaded', async () => {
    const canvas = document.getElementById('canvas');
    const config = JSON.parse(document.getElementById('config').innerHTML);
    const system = Frontend.createBasicSystem({window, canvas});

    const format = config['suiteName'].indexOf('binary') === -1 ? 'gltf' : 'glb';
    const resource = new Frontend.Assets.Resource({
        vendor: '@base',
        url: `/visual-diff/dataset/${config['suiteName']}/model.${format}`,
    });

    const {gltfManager, view} = system;

    const programFactory = new Frontend.Graphic.ContentProgramFactory({view});
    programFactory.createProgram({
        name: 'solid',
        fragment: fragmentShaderContent,
        vertex: vertexShaderContent,
    });

    const gltfContent = await gltfManager.loadContent(resource);
    const asset = await gltfManager.extractAsset({view, gltfContent});

    const sceneNode = asset.createScene(0);
    const primaryScene = system.view.sceneManager.find(n => n.name === 'primary-scene');
    sceneNode.setParent(primaryScene);

    Frontend.Graphic.printSceneNode(system.view.sceneManager);
});
