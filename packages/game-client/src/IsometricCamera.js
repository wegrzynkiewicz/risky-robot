import getOrthographicMatrix from './graphic/getOrthographicMatrix';
import getIsometricMatrix from './graphic/getIsometricMatrix';
import * as glMatrix from 'gl-matrix';
import * as glHelper from './helpers/glHelper';

export default class IsometricCamera {

    constructor({game}) {
        this.game = game;
        this.position = glHelper.vec3(0.0, 0.0, 0.0);
        this.front = glHelper.vec3(0.0, 0.0, 0.0);
        this.up = glHelper.vec3(0.0, 1.0, 0.0);
        this.right = glHelper.vec3(1.0, 0.0, 0.0);
        this.movementSpeed = 20.0;
        this.yaw = 0.0;
        this.pitch = 180 / Math.PI;
        this.zoom = 32.0;
        this.zoomSpeed = 0.2;

        const {width, height} = game.canvas.element;
        const ratio = width / height;

        this.projectionMatrix = getOrthographicMatrix(this.zoom * ratio, this.zoom);

        window.document.addEventListener('wheel', (event) => {
            this.zoom += event.deltaY * this.zoomSpeed;
            if (this.zoom <= 1.0) {
                this.zoom = 1.0;
            }
            this.projectionMatrix = getOrthographicMatrix(this.zoom * ratio, this.zoom);
        });

        this.updateCameraVectors();
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
            const one = 180 / Math.PI;
            this.yaw += event.movementX * 0.1;
            this.pitch -= event.movementY * 0.1;

            if (this.pitch > one) {
                this.pitch = one;
            } else if (this.pitch < -one) {
                this.pitch = -one;
            }

            this.updateCameraVectors();
        }
    }

    update(game, deltaTime) {
        const {pressed} = game.keyboard;
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
        glMatrix.vec3.mul(next, vector, glHelper.vec3(velocity, velocity, velocity));
        glMatrix.vec3.add(this.position, this.position, next);
        this.updateCameraVectors();
    }

    updateCameraVectors() {
        this.viewMatrix = getIsometricMatrix(this.yaw, this.pitch);
        glMatrix.mat4.translate(this.viewMatrix, this.viewMatrix, this.position);
    }
}
