import * as Frontend from 'risky-robot-frontend';
import vertexShaderContent from '../../common/shaders/solid.vert';
import fragmentShaderContent from '../../common/shaders/solid.frag';
import {Graphic} from 'risky-robot-frontend';

const start = async () => {
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
    const program = programFactory.createProgram({
        name: 'solid',
        fragment: fragmentShaderContent,
        vertex: vertexShaderContent,
    });

    const modelMatrix = Graphic.Matrix4.create();

    Graphic.Matrix4.translate(modelMatrix, modelMatrix, [0.4, 1, 0]);
    Graphic.Matrix4.rotateX(modelMatrix, modelMatrix, Math.asin(Graphic.radian(-30)));
    // Graphic.Matrix4.rotateY(modelMatrix, modelMatrix, Graphic.radian(35));
    //Graphic.Matrix4.lookAt(modelMatrix, [1, 1, 1], [0, 0, 0], [0, 1, 0]);
    console.log(modelMatrix);

    const uniformBlock = program.getUniformBlockByName('Matrices');

    const uniformBuffer = view.uniformBufferManager.createUniformBuffer({
        name: 'Matrices',
        usage: WebGL2RenderingContext['STREAM_DRAW'],
    });

    const uniformBindingPoint = view.uniformBlockManager.createBindingPoint({
        blockName: 'Matrices',
        uniformBuffer,
    });
    uniformBlock.setUniformBindingPoint(uniformBindingPoint);

    const bufferData = uniformBlock.createBufferData();
    bufferData.accessor.fields['u_modelMatrix'].write(modelMatrix);
    uniformBuffer.setBufferData(bufferData.dataView);

    const gltfContent = await gltfManager.loadContent(resource);
    const asset = await gltfManager.extractAsset({view, gltfContent});

    const sceneNode = asset.createScene(0);
    const primaryScene = system.view.sceneManager.find(n => n.name === 'primary-scene');
    sceneNode.setParent(primaryScene);

    Frontend.Graphic.printSceneNode(system.view.sceneManager);
};

document.addEventListener('DOMContentLoaded', () => setImmediate(start));
