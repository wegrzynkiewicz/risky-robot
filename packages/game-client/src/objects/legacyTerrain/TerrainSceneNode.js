import SceneNode from '../../scene/SceneNode';
import Terrain from './Terrain';
import * as glMatrix from 'gl-matrix';

export default class TerrainSceneNode extends SceneNode {
    
    constructor(game) {
        super({});

        const {openGL: gl} = game;

        this.shader = game.shaderManager.getShaderByName('terrain');

        this.modelMatrix = glMatrix.mat4.create();
        glMatrix.mat4.translate(this.modelMatrix, this.modelMatrix, [1.0, -4.0, 1.0]);
        glMatrix.mat4.scale(this.modelMatrix, this.modelMatrix, [8.0, 8.0, 8.0]);

        const {vertices, normals} = Terrain.vertices();
        this.buffers = {};
        this.buffers.positions = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.positions);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        this.buffers.normals = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normals);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    }

    render(game) {

        const {openGL: gl} = game;

        {
            const pointer = this.shader.attributes['a_Position'];
            const size = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.positions);
            gl.vertexAttribPointer(pointer, size, type, normalize, stride, offset);
            gl.enableVertexAttribArray(pointer);
        }

        {
            const pointer = this.shader.attributes['a_Normal'];
            const size = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normals);
            gl.vertexAttribPointer(pointer, size, type, normalize, stride, offset);
            gl.enableVertexAttribArray(pointer);
        }

        gl.useProgram(this.shader.program);

        gl.uniformMatrix4fv(this.shader.uniforms['projectionMatrix'], false, game.camera.getProjectionMatrix());
        gl.uniformMatrix4fv(this.shader.uniforms['viewMatrix'], false, game.camera.getViewMatrix());
        gl.uniformMatrix4fv(this.shader.uniforms['modelMatrix'], false, this.modelMatrix);

        const vertexCount = (Terrain.size ** 2) * 6 + 3;
        {
            gl.drawArrays(gl.POINTS, 0, vertexCount);
            gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
        }
    }
}
