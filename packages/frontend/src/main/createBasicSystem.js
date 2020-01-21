import Loop from "../flow/Loop";
import System from "./System";
import * as Graphic from "robo24-graphic";

export default function createBasicSystem({window, canvas}) {

    const loop = new Loop({window});

    const sceneManager = new Graphic.SceneManager();

    const scene = new Graphic.Scene({id: "primary"});
    scene.setParent(sceneManager);

    const renderer = new Graphic.CameraRenderer();

    const viewer = new Graphic.Viewer({canvas});
    viewer.createViewport({
        name: "primary",
        renderer,
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height,
    });

    const system = new System({
        window,
        viewer,
        sceneManager,
        loop,
    });

    return system;
}
