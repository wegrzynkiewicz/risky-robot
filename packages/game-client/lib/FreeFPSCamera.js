import getPerspectiveMatrix from "./graphic/getPerspectiveMatrix";
import * as glHelper from "./helpers/glHelper";

export default class FreeFPSCamera {

    constructor({game}) {
        this.game = game;
        this.position = [0.0, 0.0, 0.0];
        this.front = [0.0, 0.0, 0.0];
        this.up = [0.0, 1.0, 0.0];
        this.right = [1.0, 0.0, 0.0];
        this.worldUp = [0.0, 1.0, 0.0];
        this.movementSpeed = 31.0;
        this.yaw = 0.0;
        this.pitch = 0.0;
        this.viewMatrix = mat4.create();
        this.updateCameraVectors();

        const {width, height} = game.canvas.element;
        this.projectionMatrix = getPerspectiveMatrix(width, height);
    }

    getViewMatrix() {
        return this.viewMatrix;
    }

    getProjectionMatrix() {
        return this.projectionMatrix;
    }

    processMouse(event) {
        const middle = event.buttons & 0x04;
        if (middle) {
            this.yaw += event.movementX * 0.1;
            this.pitch -= event.movementY * 0.1;

            if (this.pitch > 90.0) {
                this.pitch = 90.0;
            } else if (this.pitch < -90.0) {
                this.pitch = -90.0;
            }

            this.updateCameraVectors();
        }
    }

    update(deltaTime) {
        const {pressed} = this.game.keyboard;
        const velocity = deltaTime * this.movementSpeed;

        if (pressed['w']) {
            this.moveVector(this.front, velocity);
        }
        if (pressed['s']) {
            this.moveVector(this.front, -velocity);
        }
        if (pressed['a']) {
            this.moveVector(this.right, -velocity);
        }
        if (pressed['d']) {
            this.moveVector(this.right, velocity);
        }
        if (pressed['q']) {
            this.moveVector(this.up, velocity);
        }
        if (pressed['z']) {
            this.moveVector(this.up, -velocity);
        }
    }

    moveVector(vector, velocity) {
        const next = math.create();
        math.mul(next, vector, [velocity, velocity, velocity]);
        math.add(this.position, this.position, next);
        this.updateCameraVectors();
    }

    updateCameraVectors() {
        const front = math.create();
        const pitch = glMatrix.toRadian(this.pitch);
        const yaw = radian(this.yaw);
        const yawCos = Math.cos(yaw);
        const pitchCos = Math.cos(pitch);
        const yawSin = Math.sin(yaw);
        const pitchSin = Math.sin(pitch);

        front[0] = yawCos * pitchCos;
        front[1] = pitchSin;
        front[2] = yawSin * pitchCos;

        math.normalize(this.front, front);

        const cross1 = math.create();
        const cross2 = math.create();

        math.cross(cross1, this.front, this.worldUp);
        math.cross(cross2, this.right, this.front);

        math.normalize(this.right, cross1);
        math.normalize(this.up, cross2);

        const center = math.create();
        math.add(center, this.position, this.front);

        mat4.lookAt(this.viewMatrix, this.position, center, this.up);
    }
}
