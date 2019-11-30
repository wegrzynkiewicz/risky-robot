import SceneNode from "../../scene/SceneNode";
import * as glMatrix from "gl-matrix";
import WallVAOGenerator from "../../wall/WallVAOGenerator";
import VAOCreator from "../../layout/VAOCreator";

export default class WallSceneNode extends SceneNode {

    constructor(game) {
        super({});

        const {openGL} = game;

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

        console.log(dataView);

        this.modelMatrix = glMatrix.mat4.create();
        this.modelMatrix = glMatrix.mat4.translate(this.modelMatrix, this.modelMatrix, [-8.0, 8.0, -5.0]);
    }

    render(game) {
        const {openGL} = game;

        openGL.bindVertexArray(this.vao.openGLVAOPointer);
        openGL.useProgram(this.shader.program);

        openGL.uniformMatrix4fv(this.shader.uniforms['u_projectionMatrix'], false, game.camera.getProjectionMatrix());
        openGL.uniformMatrix4fv(this.shader.uniforms['u_viewMatrix'], false, game.camera.getViewMatrix());
        openGL.uniformMatrix4fv(this.shader.uniforms['u_modelMatrix'], false, this.modelMatrix);

        const vertices = this.wallVAOGenerator.vertices;
        const {glDrawType} = this.vao.vaoAllocation;
        openGL.drawArrays(glDrawType, 0, vertices);
        //openGL.drawArrays(openGL.POINTS, 0, vertices);
    }
}
