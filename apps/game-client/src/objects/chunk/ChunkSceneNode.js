import SceneNode from "../../scene/SceneNode";
import cube from "../cube/cube";
import * as glMatrix from "gl-matrix";

export default class ChunkSceneNode extends SceneNode {

    constructor(game) {
        super({});

        const {openGL: gl} = game;

        this.shader = game.shaderManager.getShaderByName("chunk");

        this.modelMatrix = glMatrix.mat4.create();
        glMatrix.mat4.translate(this.modelMatrix, this.modelMatrix, [0, 64, 0]);
        glMatrix.mat4.scale(this.modelMatrix, this.modelMatrix, [4.0, 4.0, 4.0]);

        const data = cube.data();
        this.buffers = {};
        this.buffers.data = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.data);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

        const countBlocks = 32 ** 3;
        const arrayBuffer = new ArrayBuffer(countBlocks * 4 * 80);
        const dataView = new DataView(arrayBuffer);

        console.log(this.shader);

        for (let i = 0; i < countBlocks; i++) {
            const count = i * 16;
            dataView.setFloat32(count + 0, i, true);
            dataView.setFloat32(count + 4, Math.random(), true);
            dataView.setFloat32(count + 8, Math.random(), true);
            dataView.setFloat32(count + 12, Math.random(), true);
        }
        this.buffers.blocks = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.blocks);
        gl.bufferData(gl.ARRAY_BUFFER, dataView, gl.STATIC_DRAW);

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

        {
            const pointer = this.shader.attributes['_blockCount'];
            const size = 1;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 16;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.blocks);
            gl.vertexAttribPointer(pointer, size, type, normalize, stride, offset);
            gl.vertexAttribDivisor(pointer, 1);
            gl.enableVertexAttribArray(pointer);
        }

        {
            const pointer = this.shader.attributes['_blockColor'];
            const size = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 16;
            const offset = 4;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.blocks);
            gl.vertexAttribPointer(pointer, size, type, normalize, stride, offset);
            gl.vertexAttribDivisor(pointer, 1);
            gl.enableVertexAttribArray(pointer);
        }

        gl.useProgram(this.shader.program);

        gl.uniformMatrix4fv(this.shader.uniforms['projectionMatrix'], false, game.camera.getProjectionMatrix());
        gl.uniformMatrix4fv(this.shader.uniforms['viewMatrix'], false, game.camera.getViewMatrix());
        gl.uniformMatrix4fv(this.shader.uniforms['modelMatrix'], false, this.modelMatrix);

        const vertexCount = 36;
        {
            gl.drawArraysInstanced(gl.TRIANGLES, 0, vertexCount, 32 ** 2);
        }
    }
}
