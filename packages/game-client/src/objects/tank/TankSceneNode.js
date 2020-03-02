import SceneNode from '../../scene/SceneNode';
import planeData from './planeData';
import loadTexture from '../../graphic/loadTexture';
import * as glMatrix from 'gl-matrix';

export default class TankSceneNode extends SceneNode {

    constructor(game) {
        super({});

        const {openGL: gl} = game;

        this.shader = game.shaderManager.getShaderByName('tank');

        this.modelMatrix = glMatrix.mat4.create();
        glMatrix.mat4.scale(this.modelMatrix, this.modelMatrix, [1.0, 1.0, 1.0]);

        this.buffers = {};
        this.buffers.data = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.data);
        gl.bufferData(gl.ARRAY_BUFFER, planeData.arrayBuffer, gl.STATIC_DRAW);

        this.texture = loadTexture(gl, 'tankBase.png');

    }

    update(game, deltaTime) {
        const {pressed} = game.keyboard;
        const velocity = deltaTime * 3.0;

        if (pressed['ArrowUp']) {
            glMatrix.mat4.translate(this.modelMatrix, this.modelMatrix, [0.0, 0.0, -velocity]);
        }
        if (pressed['ArrowDown']) {
            glMatrix.mat4.translate(this.modelMatrix, this.modelMatrix, [0.0, 0.0, -velocity]);
        }
        if (pressed['ArrowLeft']) {
            glMatrix.mat4.rotateY(this.modelMatrix, this.modelMatrix, velocity);
        }
        if (pressed['ArrowRight']) {
            glMatrix.mat4.rotateY(this.modelMatrix, this.modelMatrix, -velocity);
        }
    }

    render(game) {

        const {openGL: gl} = game;

        planeData.bind(this.shader, this.buffers.data, gl);

        gl.useProgram(this.shader.program);

        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0);

        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(this.shader.uniforms['u_Sampler'], 0);

        gl.uniformMatrix4fv(this.shader.uniforms['projectionMatrix'], false, game.camera.getProjectionMatrix());
        gl.uniformMatrix4fv(this.shader.uniforms['viewMatrix'], false, game.camera.getViewMatrix());
        gl.uniformMatrix4fv(this.shader.uniforms['modelMatrix'], false, this.modelMatrix);

        gl.drawArrays(gl.TRIANGLES, 0, planeData.vertices);
        gl.drawArrays(gl.POINTS, 0, planeData.vertices);
    }
}
