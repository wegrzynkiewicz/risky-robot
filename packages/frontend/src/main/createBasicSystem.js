import AnimationLoop from "../flow/AnimationLoop";
import System from "./System";
import * as Graphic from "robo24-graphic";

export default function createBasicSystem({window, canvas}) {

    const animationLoop = new AnimationLoop({window});

    const sceneManager = new Graphic.SceneManager();

    const scene = new Graphic.Scene({name: "primary-scene"});
    scene.setParent(sceneManager);

    const camera = new Graphic.Camera();
    const fieldOfView = Graphic.radian(45);
    const aspect = canvas.width / canvas.height;
    const near = 1;
    const far = 1000;
    Graphic.Matrix4.perspective(camera.projectionMatrix, fieldOfView, aspect, near, far);

    const viewport = new Graphic.Viewport({
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height,
    });

    const renderer = new Graphic.SingleCameraRenderer({
        camera,
        viewport,
        sceneNode: scene
    });

    const view = new Graphic.View({canvas});
    const primaryRenderingTask = new Graphic.RenderingTask({
        enabled: true,
        weight: 1.0000,
        renderer,
    });
    view.renderingFlow.registerTask(primaryRenderingTask);

    const system = new System({
        window,
        view,
        sceneManager,
        animationLoop,
    });

    animationLoop.start();

    return system;
}
