import SceneNode from "../../scene/SceneNode";
import cube from "../legacyCube/cube";
import * as glMatrix from "gl-matrix";
import terrainOrientationUniformBuffer from "../../terrainOrientationUniformBuffer";
import terrainGenerator from "../../terrainGenerator";
import cubeVAOLayout from "./cubeVAOLayout";
import cubeBufferProvider from "./cubeBufferProvider";
import VAO from "../../layout/VAO";

export default class CubeSceneNode extends SceneNode {

    constructor(game) {
        super({});

        const {openGL} = game;

        this.shader = game.shaderManager.getShaderByName("cube");

        const dataBuffer = cubeBufferProvider();
        const buffer = openGL.createBuffer();
        openGL.bindBuffer(openGL.ARRAY_BUFFER, buffer);
        openGL.bufferData(openGL.ARRAY_BUFFER, dataBuffer, openGL.STATIC_DRAW);

        this.vao = new VAO(cubeVAOLayout);
        this.vao.initialize({
            openGL,
            shader: this.shader,
            glBufferPointers: [buffer],
        });

        this.modelMatrix = glMatrix.mat4.create();

        /*
        const data = cube.data();
        this.buffers = {};
        this.buffers.vertices = openGL.createBuffer();
        openGL.bindBuffer(openGL.ARRAY_BUFFER, this.buffers.vertices);
        openGL.bufferData(openGL.ARRAY_BUFFER, terrainGenerator.vertices, openGL.STATIC_DRAW);

        this.buffers.planes = openGL.createBuffer();
        openGL.bindBuffer(openGL.ARRAY_BUFFER, this.buffers.planes);
        openGL.bufferData(openGL.ARRAY_BUFFER, terrainGenerator.planes, openGL.STATIC_DRAW);

        // var blockIndex_1 = openGL.getUniformBlockIndex(program, "UBOData");
        // var blockSize_1 = openGL.getActiveUniformBlockParameter(program, blockIndex_1, openGL.UNIFORM_BLOCK_DATA_SIZE);
        // var uniformIndices_1 = openGL.getUniformIndices(program, ["UBORed", "UBOGreen", "UBOBlue"]);
        // var uniformOffsets_1 = openGL.getActiveUniforms(program, uniformIndices_1, openGL.UNIFORM_OFFSET);
        // var blockIndex_2 = openGL.getUniformBlockIndex(program, "UBOD");
        // var blockSize_2 = openGL.getActiveUniformBlockParameter(program, blockIndex_2, openGL.UNIFORM_BLOCK_DATA_SIZE);
        // var uniformIndices_2 = openGL.getUniformIndices(program, ["UBOR", "UBOG", "UBOB"]);
        // var uniformOffsets_2 = openGL.getActiveUniforms(program, uniformIndices_2, openGL.UNIFORM_OFFSET);
        // wtu.glErrorShouldBe(gl, openGL.NO_ERROR, "should be able to query uniform block information without error");

        const blockIndex_1 = openGL.getUniformBlockIndex(this.shader.program, "UniformBlock");
        const blockSize_1 = openGL.getActiveUniformBlockParameter(this.shader.program, blockIndex_1, openGL.UNIFORM_BLOCK_DATA_SIZE);
        const uniformIndices_1 = openGL.getUniformIndices(this.shader.program, [
            "offsets[0]",
        ]);
        const uniformOffsets_1 = openGL.getActiveUniforms(this.shader.program, uniformIndices_1, openGL.UNIFORM_OFFSET);

        var b_1 = openGL.createBuffer();
        openGL.bindBuffer(openGL.UNIFORM_BUFFER, b_1);
        openGL.bufferData(openGL.UNIFORM_BUFFER, terrainOrientationUniformBuffer, openGL.DYNAMIC_DRAW);
        openGL.uniformBlockBinding(this.shader.program, blockIndex_1, 1);
        openGL.bindBufferBase(openGL.UNIFORM_BUFFER, 1, b_1);
         */
    }

    render(game) {
        const {openGL} = game;

        this.vao.use(openGL);
        openGL.useProgram(this.shader.program);

        openGL.uniformMatrix4fv(this.shader.uniforms['u_projectionMatrix'], false, game.camera.getProjectionMatrix());
        openGL.uniformMatrix4fv(this.shader.uniforms['u_viewMatrix'], false, game.camera.getViewMatrix());
        openGL.uniformMatrix4fv(this.shader.uniforms['u_modelMatrix'], false, this.modelMatrix);

        const {glDrawType, vertices} = this.vao.vaoLayout;
        openGL.drawArrays(glDrawType, 0, vertices);
    }
}
