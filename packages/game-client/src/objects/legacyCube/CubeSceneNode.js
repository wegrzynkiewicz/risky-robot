import SceneNode from '../../scene/SceneNode';
import cube from './cube';
import * as glMatrix from 'gl-matrix';
import terrainOrientationUniformBuffer from '../../terrainOrientationUniformBuffer';
import terrainGenerator from '../../terrainGenerator';

export default class CubeSceneNode extends SceneNode {

    constructor(game) {
        super({});

        const {openGL: gl} = game;

        this.shader = game.shaderManager.getShaderByName('cube');

        this.modelMatrix = glMatrix.mat4.create();

        const data = cube.data();
        this.buffers = {};

        this.buffers.vertices = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertices);
        gl.bufferData(gl.ARRAY_BUFFER, terrainGenerator.vertices, gl.STATIC_DRAW);

        this.buffers.planes = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.planes);
        gl.bufferData(gl.ARRAY_BUFFER, terrainGenerator.planes, gl.STATIC_DRAW);

        // var blockIndex_1 = gl.getUniformBlockIndex(program, "UBOData");
        // var blockSize_1 = gl.getActiveUniformBlockParameter(program, blockIndex_1, gl.UNIFORM_BLOCK_DATA_SIZE);
        // var uniformIndices_1 = gl.getUniformIndices(program, ["UBORed", "UBOGreen", "UBOBlue"]);
        // var uniformOffsets_1 = gl.getActiveUniforms(program, uniformIndices_1, gl.UNIFORM_OFFSET);
        // var blockIndex_2 = gl.getUniformBlockIndex(program, "UBOD");
        // var blockSize_2 = gl.getActiveUniformBlockParameter(program, blockIndex_2, gl.UNIFORM_BLOCK_DATA_SIZE);
        // var uniformIndices_2 = gl.getUniformIndices(program, ["UBOR", "UBOG", "UBOB"]);
        // var uniformOffsets_2 = gl.getActiveUniforms(program, uniformIndices_2, gl.UNIFORM_OFFSET);
        // wtu.glErrorShouldBe(gl, gl.NO_ERROR, "should be able to query uniform block information without error");

        const blockIndex_1 = gl.getUniformBlockIndex(this.shader.program, 'UniformBlock');
        const blockSize_1 = gl.getActiveUniformBlockParameter(this.shader.program, blockIndex_1, gl.UNIFORM_BLOCK_DATA_SIZE);
        const uniformIndices_1 = gl.getUniformIndices(this.shader.program, [
            'offsets[0]',
        ]);
        const uniformOffsets_1 = gl.getActiveUniforms(this.shader.program, uniformIndices_1, gl.UNIFORM_OFFSET);

        var b_1 = gl.createBuffer();
        gl.bindBuffer(gl.UNIFORM_BUFFER, b_1);
        gl.bufferData(gl.UNIFORM_BUFFER, terrainOrientationUniformBuffer, gl.DYNAMIC_DRAW);
        gl.uniformBlockBinding(this.shader.program, blockIndex_1, 1);
        gl.bindBufferBase(gl.UNIFORM_BUFFER, 1, b_1);
    }

    render(game) {
        const {openGL: gl} = game;

        {
            const pointer = this.shader.attributes['a_VertexOrientIndex'];
            const size = 1;
            const type = gl.BYTE;
            const normalize = false;
            const stride = 2;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertices);
            gl.vertexAttribIPointer(pointer, size, type, normalize, stride, offset);
            gl.enableVertexAttribArray(pointer);
        }

        {
            const pointer = this.shader.attributes['a_VertexHeight'];
            const size = 1;
            const type = gl.BYTE;
            const normalize = false;
            const stride = 2;
            const offset = 1;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertices);
            gl.vertexAttribIPointer(pointer, size, type, normalize, stride, offset);
            gl.enableVertexAttribArray(pointer);
        }

        {
            const pointer = this.shader.attributes['a_Index'];
            const size = 1;
            const type = gl.SHORT;
            const normalize = false;
            const stride = 4;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.planes);
            gl.vertexAttribIPointer(pointer, size, type, normalize, stride, offset);
            gl.enableVertexAttribArray(pointer);
        }

        gl.useProgram(this.shader.program);

        gl.uniformMatrix4fv(this.shader.uniforms['projectionMatrix'], false, game.camera.getProjectionMatrix());
        gl.uniformMatrix4fv(this.shader.uniforms['viewMatrix'], false, game.camera.getViewMatrix());
        gl.uniformMatrix4fv(this.shader.uniforms['modelMatrix'], false, this.modelMatrix);

        const vertexCount = 32 * 32;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        {
            gl.drawArrays(gl.POINTS, 0, vertexCount);
        }
    }
}
