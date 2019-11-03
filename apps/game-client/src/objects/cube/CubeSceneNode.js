import SceneNode from "../../scene/SceneNode";
import cube from "./cube";
import * as glMatrix from "gl-matrix";

export default class CubeSceneNode extends SceneNode {

    constructor(game) {
        super({});

        const {openGL: gl} = game;

        this.shader = game.shaderManager.getShaderByName("cube");

        this.modelMatrix = glMatrix.mat4.create();
        glMatrix.mat4.translate(this.modelMatrix, this.modelMatrix, [1, 1, 1]);
        glMatrix.mat4.multiplyScalar(this.modelMatrix, this.modelMatrix, 1 / 16);
        glMatrix.mat4.translate(this.modelMatrix, this.modelMatrix, [2*7, 0, 2*7]);

        const data = cube.data();
        this.buffers = {};
        this.buffers.data = gl.createBuffer();
        console.log(data);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.data);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    }

    render(game) {

        const {openGL: gl} = game;

        {
            const pointer = this.shader.attributes['_vertexPosition'];
            const size = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 24;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.data);
            gl.vertexAttribPointer(pointer, size, type, normalize, stride, offset);
            gl.enableVertexAttribArray(pointer);
        }

        {
            const pointer = this.shader.attributes['_vertexNormal'];
            const size = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 24;
            const offset = 12;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.data);
            gl.vertexAttribPointer(pointer, size, type, normalize, stride, offset);
            gl.enableVertexAttribArray(pointer);
        }

        gl.useProgram(this.shader.program);

        gl.uniformMatrix4fv(this.shader.uniforms['projectionMatrix'], false, game.camera.getProjectionMatrix());
        gl.uniformMatrix4fv(this.shader.uniforms['viewMatrix'], false, game.camera.getViewMatrix());
        gl.uniformMatrix4fv(this.shader.uniforms['modelMatrix'], false, this.modelMatrix);

        const vertexCount = 36;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        {
            gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
        }
    }
}
