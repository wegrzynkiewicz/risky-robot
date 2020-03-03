import Terrain from './Terrain';
import getIsometricMatrix from './graphic/getIsometricMatrix';

function initBuffers() {

    const {vertices, normals} = Terrain.vertices();
    const indices = Terrain.indices();

    const positionBuffer = this.openGL.createBuffer();
    this.openGL.bindBuffer(this.openGL.ARRAY_BUFFER, positionBuffer);
    this.openGL.bufferData(this.openGL.ARRAY_BUFFER, new Float32Array(vertices), this.openGL.STATIC_DRAW);

    const normalBuffer = this.openGL.createBuffer();
    this.openGL.bindBuffer(this.openGL.ARRAY_BUFFER, normalBuffer);
    this.openGL.bufferData(this.openGL.ARRAY_BUFFER, new Float32Array(normals), this.openGL.STATIC_DRAW);

    const indexBuffer = this.openGL.createBuffer();
    this.openGL.bindBuffer(this.openGL.ELEMENT_ARRAY_BUFFER, indexBuffer);
    this.openGL.bufferData(this.openGL.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.openGL.STATIC_DRAW);

    return {
        position: positionBuffer,
        indices: indexBuffer,
        normals: normalBuffer,
    };
}

/**
 * @property {Viewport} canvas
 */
export default class SceneX {

    /**
     * @param options
     */
    constructor(options) {
        Object.assign(this, options);
        this.openGL = this.canvas.openGL;
        this.programInfo = this.shaderManager.getShaderByName('terrain');
        this.buffers = initBuffers.call(this);
        this.previousTimestamp = 0;

        //requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    mainAnimationLoop(currentTimestamp) {
        const currentTimestamps = currentTimestamp * 0.001;
        const deltaTime = currentTimestamp - this.previousTimestamp;
        this.previousTimestamp = currentTimestamp;

        this.render(deltaTime);
    }

    render(deltaTime) {

        this.openGL.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
        this.openGL.clearDepth(1.0);                 // Clear everything
        this.openGL.enable(this.openGL.DEPTH_TEST);           // Enable depth testing
        this.openGL.depthFunc(this.openGL.LEQUAL);            // Near things obscure far things
        this.openGL.enable(this.openGL.CULL_FACE);
        this.openGL.cullFace(this.openGL.BACK);
        this.openGL.frontFace(this.openGL.CCW);
        this.openGL.clear(this.openGL.COLOR_BUFFER_BIT | this.openGL.DEPTH_BUFFER_BIT);

        const projectionMatrix = mat4.create();
        const viewMatrix = mat4.create();
        const modelMatrix = mat4.create();

        // note: this.openGL.atrix.js always has the first argument
        // as the destination to receive the result.
        mat4.ortho(
            projectionMatrix,
            -320 / 256,
            320 / 256,
            -240 / 256,
            240 / 256,
            -10,
            10,
        );

        const isometric = getIsometricMatrix(this.game.posX, this.game.posY);

        mat4.mul(
            projectionMatrix,
            projectionMatrix,
            isometric,
        );

        // Set the drawing position to the "identity" point, which is
        // the center of the scene.

        // Tell WebGL how to pull out the positions from the position
        // buffer into the vertexPosition attribute
        {
            const numComponents = 3;
            const type = this.openGL.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            this.openGL.bindBuffer(this.openGL.ARRAY_BUFFER, this.buffers.position);
            this.openGL.vertexAttribPointer(
                this.programInfo.attributes._vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            this.openGL.enableVertexAttribArray(
                this.programInfo.attributes._vertexPosition);
        }

        {
            const numComponents = 3;
            const type = this.openGL.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            this.openGL.bindBuffer(this.openGL.ARRAY_BUFFER, this.buffers.normals);
            this.openGL.vertexAttribPointer(
                this.programInfo.attributes._vertexNormal,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            this.openGL.enableVertexAttribArray(
                this.programInfo.attributes._vertexNormal);
        }
/*
        // Tell WebGL which indices to use to index the vertices
        this.openGL.bindBuffer(this.openGL.ARRAY_BUFFER, this.buffers.position);
*/
        // Tell WebGL to use our program when drawing

        this.openGL.useProgram(this.programInfo.program);

        // Set the shader uniforms

        this.openGL.uniformMatrix4fv(
            this.programInfo.uniforms.projectionMatrix,
            false,
            projectionMatrix);
        this.openGL.uniformMatrix4fv(
            this.programInfo.uniforms.viewMatrix,
            false,
            viewMatrix);
        this.openGL.uniformMatrix4fv(
            this.programInfo.uniforms.modelMatrix,
            false,
            modelMatrix);

        const vertexCount = (Terrain.size ** 2) * 6 + 3;
        const type = this.openGL.UNSIGNED_SHORT;
        const offset = 0;
        {
            this.openGL.drawArrays(this.openGL.TRIANGLES, 0, vertexCount);
            this.openGL.drawArrays(this.openGL.POINTS, 0, vertexCount);
        }
    }
}
