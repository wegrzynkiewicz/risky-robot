import SceneNode from '../../scene/SceneNode';
import pivotData from './pivotData';
import * as glMatrix from 'gl-matrix';

export default class PivotSceneNode extends SceneNode {

    constructor(game) {
        super({});

        const {openGL: gl} = game;

        this.shader = game.shaderManager.getShaderByName('pivot');

        this.modelMatrix = glMatrix.mat4.create();
        glMatrix.mat4.scale(this.modelMatrix, this.modelMatrix, [1.0, 1.0, 1.0]);

        this.buffers = {};
        this.buffers.points = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.points);
        gl.bufferData(gl.ARRAY_BUFFER, pivotData.points(), gl.STATIC_DRAW);

        this.buffers.lines = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.lines);
        gl.bufferData(gl.ARRAY_BUFFER, pivotData.lines(), gl.STATIC_DRAW);
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
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.lines);
            gl.vertexAttribPointer(pointer, size, type, normalize, stride, offset);
            gl.enableVertexAttribArray(pointer);
        }

        {
            const pointer = this.shader.attributes['_vertexColor'];
            const size = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 24;
            const offset = 12;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.lines);
            gl.vertexAttribPointer(pointer, size, type, normalize, stride, offset);
            gl.enableVertexAttribArray(pointer);
        }

        gl.useProgram(this.shader.program);

        gl.uniformMatrix4fv(this.shader.uniforms['projectionMatrix'], false, game.camera.getProjectionMatrix());
        gl.uniformMatrix4fv(this.shader.uniforms['viewMatrix'], false, game.camera.getViewMatrix());
        gl.uniformMatrix4fv(this.shader.uniforms['modelMatrix'], false, this.modelMatrix);

        {
            const vertexCount = 6;
            gl.drawArrays(gl.LINES, 0, vertexCount);
        }

        {
            const pointer = this.shader.attributes['_vertexPosition'];
            const size = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 24;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.points);
            gl.vertexAttribPointer(pointer, size, type, normalize, stride, offset);
            gl.enableVertexAttribArray(pointer);
        }

        {
            const pointer = this.shader.attributes['_vertexColor'];
            const size = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 24;
            const offset = 12;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.points);
            gl.vertexAttribPointer(pointer, size, type, normalize, stride, offset);
            gl.enableVertexAttribArray(pointer);
        }

        gl.useProgram(this.shader.program);

        gl.uniformMatrix4fv(this.shader.uniforms['projectionMatrix'], false, game.camera.getProjectionMatrix());
        gl.uniformMatrix4fv(this.shader.uniforms['viewMatrix'], false, game.camera.getViewMatrix());
        gl.uniformMatrix4fv(this.shader.uniforms['modelMatrix'], false, this.modelMatrix);

        {
            const vertexCount = 3;
            gl.drawArrays(gl.POINTS, 0, vertexCount);
        }
    }
}
