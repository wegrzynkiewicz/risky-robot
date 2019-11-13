// import Network from "./Network";
import Canvas from "./Canvas";
import createSceneManager from "./scene/createSceneManager";
import ShaderManager from "./shader/ShaderManager";
import shaderRegistry from "./shader/shaderRegistry";
import Keyboard from "./Keyboard";
import IsometricCamera from "./IsometricCamera";
import * as glHelper from "./helpers/glHelper";

export default class Game {

    constructor() {
        const game = this;
        window.game = this;

        this.keyboard = new Keyboard({game});

        // this.network = new Network({game});

        this.canvas = new Canvas();
        this.openGL = this.canvas.openGL;

        this.posX = -45;
        this.posY = 35;
        this.shaderManager = new ShaderManager(this.openGL, shaderRegistry);
        /*this.camera = {
            getViewMatrix() {
                return this.viewMatrix;
            },
            getProjectionMatrix() {
                return this.projectionMatrix;
            },
            projectionMatrix: getOrthographicMatrix(),
            viewMatrix: getIsometricMatrix(this.posX, this.posY),
        };*/

        this.camera = new IsometricCamera({game});

        this.sceneManager = createSceneManager(game);
        this.sceneManager.debug(console.log);

        this.previousTimestampSeconds = 0;
        this.loop = this.loop.bind(this);
        this.loop(0);
    }

    async init() {
    }

    processKeyboard(event, app) {

        window.document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
                this.network.sendMessage(new Move({
                    entityId: 4,
                    position: glHelper.vec3(1.0, 0.0, 0.0),
                    rotate: glHelper.vec3(0.0, 0.0, 0.0),
                }))
            }
        });

        window.document.addEventListener("keyup", (event) => {
            if (event.key === "ArrowUp") {
                this.network.sendMessage(new Move({
                    entityId: 4,
                    position: glHelper.vec3(0.0, 0.0, 0.0),
                    rotate: glHelper.vec3(0.0, 0.0, 0.0),
                }))
            }
        });

        return true;
    }

    processMouse(event) {
        this.camera.processMouse(event);
        const middle = event.buttons & 0x04;
        if (middle) {
            this.posX += event.movementX * 0.1;
            this.posY += event.movementY * 0.1;
            //this.camera.viewMatrix = getIsometricMatrix(this.posX, this.posY);
        }
    }

    loop(currentTimestamp) {
        const currentTimestampSeconds = currentTimestamp * 0.001;
        const deltaTime = currentTimestampSeconds - this.previousTimestampSeconds;
        this.previousTimestampSeconds = currentTimestampSeconds;

        if (deltaTime !== 0.0) {
            this.camera.update(this, deltaTime);
            this.sceneManager.update(this, deltaTime);
            this.sceneManager.render(this);
        }

        // this.scene.render(deltaTime);

        window.requestAnimationFrame(this.loop);
    }
}
