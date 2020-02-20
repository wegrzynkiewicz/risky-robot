import SceneNode from "../../scene/SceneNode";
import * as glMatrix from "gl-matrix";
import WallVAOGenerator from "../../wall/WallVAOGenerator";
import VAOCreator from "../../layout/VAOCreator";

const set = function (dataview, offset, array, number) {
    for (let i = 0; i < number; i++) {
        const o = offset + (i * 4);
        dataview.setFloat32(o, array[i], true);
    }
};

export default class WallSceneNode extends SceneNode {

    constructor(game) {
        super({});

        const {openGL} = game;

        this.modelMatrix = glMatrix.mat4.create();
        this.modelMatrix = glMatrix.mat4.translate(this.modelMatrix, this.modelMatrix, [-8.0, 8.0, -5.0]);

        this.shader = game.shaderManager.getShaderByName("wall");

        const {vaoAllocation, wallVAOGenerator, dataView} = WallVAOGenerator;

        this.wallVAOGenerator = wallVAOGenerator;
        const buffer = openGL.createBuffer();
        openGL.bindBuffer(openGL.ARRAY_BUFFER, buffer);
        openGL.bufferData(openGL.ARRAY_BUFFER, dataView, openGL.STATIC_DRAW);

        const vaoCreator = new VAOCreator(openGL);
        this.vao = vaoCreator.createVAO({
            shader: this.shader,
            vaoAllocation,
            buffers: {
                "vertices": buffer,
            },
        });

        const gl = openGL;
        const program = this.shader.program;

        const blockIndex_1 = gl.getUniformBlockIndex(program, "TestBlock");
        console.log('blockIndex_1', blockIndex_1);
        const blockSize_1 = gl.getActiveUniformBlockParameter(program, blockIndex_1, gl.UNIFORM_BLOCK_DATA_SIZE);
        console.log('blockSize_1', blockSize_1);

        const indicesName = [
            "floaty",
            "light[0].test1",
            "light[0].test2",
            "light[0].color",
            "light[1].test1",
            "light[1].test2",
            "light[1].color",
            "u_viewMatrix1",
            "lightx[0].test1",
            "lightx[0].test2",
            "lightx[0].color",
            "lightx[1].test1",
            "lightx[1].test2",
            "lightx[1].color",
            "u_projectionMatrix",
            "u_modelMatrix",
        ];
        const uniformIndices_1 = gl.getUniformIndices(program, indicesName);
        //const uniformIndices_1 = gl.getUniformIndices(program, ["u_modelMatrix1"]);


        console.log('uniformIndices_1', uniformIndices_1);

        this.uniformOffsets_1 = gl.getActiveUniforms(program, uniformIndices_1, gl.UNIFORM_OFFSET);
        console.log('uniformOffsets_1', this.uniformOffsets_1);

        indicesName.map((e, i) => {console.log(this.uniformOffsets_1[i], e)});

        const uboArray = new ArrayBuffer(blockSize_1);
        this.dataview = new DataView(uboArray);
        const float32 = new Float32Array(uboArray);

        set(this.dataview, this.uniformOffsets_1[0], game.camera.getProjectionMatrix(), 16);
        set(this.dataview, this.uniformOffsets_1[1], this.modelMatrix, 16);

        console.log(float32);

        const binding = 4;
        this.b1 = gl.createBuffer();
        gl.bindBuffer(gl.UNIFORM_BUFFER, this.b1);
        gl.bufferData(gl.UNIFORM_BUFFER, uboArray, gl.DYNAMIC_DRAW);
        gl.uniformBlockBinding(program, blockIndex_1, binding);
        gl.bindBufferBase(gl.UNIFORM_BUFFER, binding, this.b1);
        gl.bindBuffer(gl.UNIFORM_BUFFER, null);
    }

    render(game) {
        const {openGL} = game;

        openGL.bindVertexArray(this.vao.openGLVAOPointer);
        openGL.useProgram(this.shader.program);

        // openGL.uniformMatrix4fv(this.shader.uniforms['u_projectionMatrix'], false, game.camera.getProjectionMatrix());
        // openGL.uniformMatrix4fv(this.shader.uniforms['u_viewMatrix'], false, game.camera.getViewMatrix());
        // openGL.uniformMatrix4fv(this.shader.uniforms['u_modelMatrix'], false, this.modelMatrix);

        set(this.dataview, this.uniformOffsets_1[2], game.camera.getViewMatrix(), 16);
        openGL.bindBuffer(openGL.UNIFORM_BUFFER, this.b1);
        openGL.bufferSubData(openGL.UNIFORM_BUFFER, 0, this.dataview, 0, 16*4);

        const vertices = this.wallVAOGenerator.vertices;
        const {glDrawType} = this.vao.vaoAllocation;
        openGL.drawArrays(glDrawType, 0, vertices);
        //openGL.drawArrays(openGL.POINTS, 0, vertices);
    }
}
