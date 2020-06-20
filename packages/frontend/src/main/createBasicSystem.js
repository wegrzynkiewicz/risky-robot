import * as Assets from 'risky-robot-assets';
import * as GLTFLoader from 'risky-robot-gltf-loader';
import * as Graphic from 'risky-robot-graphic';
import AnimationLoop from '../flow/AnimationLoop';
import System from './System';

export default function createBasicSystem({window, canvas}) {

    const camera = new Graphic.Camera();
    const fieldOfView = Graphic.radian(45);
    const aspect = canvas.width / canvas.height;
    const near = 1;
    const far = 1000;
    Graphic.Matrix4.perspective(camera.projectionMatrix, fieldOfView, aspect, near, far);

    const viewport = new Graphic.Viewport({
        height: canvas.height,
        width: canvas.width,
        x: 0,
        y: 0,
    });

    const view = new Graphic.View({canvas});

    const scene = new Graphic.Scene({name: 'primary-scene'});
    scene.setParent(view.sceneManager);

    const renderer = new Graphic.SingleCameraRenderer({
        camera,
        sceneNode: scene,
        viewport,
    });

    const primaryRenderingTask = new Graphic.RenderingTask({
        enabled: true,
        renderer,
        weight: 1.0000,
    });
    view.renderingFlow.registerTask(primaryRenderingTask);

    const resourceManager = new Assets.ResourceManager({window});
    const gltfManager = new GLTFLoader.GLTFManager({resourceManager});

    const animationLoop = new AnimationLoop({window});

    const system = new System({
        animationLoop,
        gltfManager,
        resourceManager,
        view,
        window,
    });

    system.animationLoop.start();

    return system;
}
