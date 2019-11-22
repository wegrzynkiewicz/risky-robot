import SceneNode from "../../scene/SceneNode";
import * as glMatrix from "gl-matrix";
import VAO from "../../layout/VAO";
import worldBuffer from "./worldBuffer";

export default class WorldSceneNode extends SceneNode {

    constructor(game) {
        super({});

        const {openGL} = game;

        this.shader = game.shaderManager.getShaderByName("world");

        const {vaoLayout, dataView} = worldBuffer;

        const buffer = openGL.createBuffer();
        openGL.bindBuffer(openGL.ARRAY_BUFFER, buffer);
        openGL.bufferData(openGL.ARRAY_BUFFER, dataView, openGL.STATIC_DRAW);

        this.vao = new VAO(vaoLayout);
        this.vao.initialize({
            openGL,
            shader: this.shader,
            glBufferPointers: [buffer],
        });

        this.modelMatrix = glMatrix.mat4.create();
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
        openGL.drawArrays(openGL.POINTS, 0, vertices);
    }
}
