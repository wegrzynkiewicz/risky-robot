import getPerspectiveMatrix from './graphic/getPerspectiveMatrix';
import * as glMatrix from 'gl-matrix';
import * as glHelper from './helpers/glHelper';

export default class FreeFPSCamera {

    constructor({game}) {
        this.game = game;
        this.position = [8.0, 16.0, 8.0];
        this.front = [0.0, 0.0, 0.0];
        this.up = [0.0, 1.0, 0.0];
        this.right = [1.0, 0.0, 0.0];
        this.worldUp = [0.0, 1.0, 0.0];
        this.movementSpeed = 31.0;
        this.yaw = -90.0;
        this.pitch = -90.0;
        this.viewMatrix = glMatrix.mat4.create();
        this.updateCameraVectors();
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

    update(game, deltaTime) {
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
        const next = glMatrix.vec3.create();
        glMatrix.vec3.mul(next, vector, [velocity, velocity, velocity]);
        glMatrix.vec3.add(this.position, this.position, next);
        this.updateCameraVectors();
    }

    updateCameraVectors() {
        const front = glMatrix.vec3.create();
        const pitch = glHelper.radian(this.pitch);
        const yaw = glHelper.radian(this.yaw);
        const yawCos = Math.cos(yaw);
        const pitchCos = Math.cos(pitch);
        const yawSin = Math.sin(yaw);
        const pitchSin = Math.sin(pitch);

        front[0] = yawCos * pitchCos;
        front[1] = pitchSin;
        front[2] = yawSin * pitchCos;

        glMatrix.vec3.normalize(this.front, front);

        const cross1 = glMatrix.vec3.create();
        const cross2 = glMatrix.vec3.create();

        glMatrix.vec3.cross(cross1, this.front, this.worldUp);
        glMatrix.vec3.cross(cross2, this.right, this.front);

        glMatrix.vec3.normalize(this.right, cross1);
        glMatrix.vec3.normalize(this.up, cross2);

        const center = glMatrix.vec3.create();
        glMatrix.vec3.add(center, this.position, this.front);

        glMatrix.mat4.lookAt(this.viewMatrix, this.position, center, this.up);
    }
}
