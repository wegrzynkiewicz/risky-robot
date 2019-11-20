import SceneNode from "../../scene/SceneNode";
import cube from "../legacyCube/cube";
import * as glMatrix from "gl-matrix";
import terrainOrientationUniformBuffer from "../../terrainOrientationUniformBuffer";
import terrainGenerator from "../../terrainGenerator";
import cubeVAOLayout from "./cubeVAOLayout";
import cubeBufferProvider from "./cubeBufferProvider";

export default class CubeSceneNode extends SceneNode {

    constructor(game) {
        super({});

        const {openGL: gl} = game;

        this.shader = game.shaderManager.getShaderByName("cube");


        const dataBuffer = cubeBufferProvider();
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, dataBuffer, gl.STATIC_DRAW);

        this.vao = cubeVAOLayout.createVAO({
            openGL: gl,
            shader: this.shader,
            buffers: [buffer],
        });

        this.modelMatrix = glMatrix.mat4.create();

        /*
        const data = cube.data();
        this.buffers = {};
        this.buffers.vertices = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertices);
        gl.bufferData(gl.ARRAY_BUFFER, terrainGenerator.vertices, gl.STATIC_DRAW);

        console.log(terrainGenerator);

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

        console.log(terrainOrientationUniformBuffer);

        const blockIndex_1 = gl.getUniformBlockIndex(this.shader.program, "UniformBlock");
        const blockSize_1 = gl.getActiveUniformBlockParameter(this.shader.program, blockIndex_1, gl.UNIFORM_BLOCK_DATA_SIZE);
        const uniformIndices_1 = gl.getUniformIndices(this.shader.program, [
            "offsets[0]",
        ]);
        const uniformOffsets_1 = gl.getActiveUniforms(this.shader.program, uniformIndices_1, gl.UNIFORM_OFFSET);

        console.log(blockSize_1);
        console.log(uniformIndices_1);
        console.log('offsets', uniformOffsets_1);

        var b_1 = gl.createBuffer();
        gl.bindBuffer(gl.UNIFORM_BUFFER, b_1);
        gl.bufferData(gl.UNIFORM_BUFFER, terrainOrientationUniformBuffer, gl.DYNAMIC_DRAW);
        gl.uniformBlockBinding(this.shader.program, blockIndex_1, 1);
        gl.bindBufferBase(gl.UNIFORM_BUFFER, 1, b_1);
         */
    }

    render(game) {
        const {openGL: gl} = game;

        gl.bindVertexArray(this.vao);
        gl.useProgram(this.shader.program);

        gl.uniformMatrix4fv(this.shader.uniforms['projectionMatrix'], false, game.camera.getProjectionMatrix());
        gl.uniformMatrix4fv(this.shader.uniforms['viewMatrix'], false, game.camera.getViewMatrix());
        gl.uniformMatrix4fv(this.shader.uniforms['modelMatrix'], false, this.modelMatrix);

        const vertexCount = 36;
        gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
    }
}
