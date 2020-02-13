import * as Frontend from "robo24-frontend";

import vertexShaderContent from "./shader.vert";
import fragmentShaderContent from "./shader.frag";

const {Graphic} = Frontend;

document.addEventListener("DOMContentLoaded", async () => {
    const canvas = document.getElementById("canvas");
    const system = Frontend.createBasicSystem({window, canvas});

    const vaoLayout = Graphic.VAOLayout.createBasicLayout({
        primitive: "triangle",
        elementsCount: 1,
        indices: false,
        attributes: [
            {buffer: "primary", batch: 0, name: "a_VertexPosition", type: "vec3<f32>"},
            {buffer: "primary", batch: 0, name: "a_VertexTextureCoords", type: "vec2<f32>"},
        ],
    });

    const bufferLayout = vaoLayout.getBufferLayout("primary");
    const dataView = bufferLayout.createDataView();
    const positionAccessor = bufferLayout.getAccessorByName("a_VertexPosition");

    positionAccessor.write(dataView, 0, [-0.5, -0.5, 0]);
    positionAccessor.write(dataView, 1, [0.5, -0.5, 0]);
    positionAccessor.write(dataView, 2, [-0.5, 0.5, 0]);

    const textureCoordsAccessor = bufferLayout.getAccessorByName("a_VertexTextureCoords");

    textureCoordsAccessor.write(dataView, 0, [0, 0.5]);
    textureCoordsAccessor.write(dataView, 1, [0.5, 0.5]);
    textureCoordsAccessor.write(dataView, 2, [0, 0]);

    const {bufferManager, vaoManager, programManager} = system.view;

    const buffer = bufferManager.createBuffer({
        name: "triangle",
        type: "ARRAY_BUFFER",
        bufferLayout
    });

    buffer.setDataView(dataView);

    programManager.registerShaderContent("triangle", vertexShaderContent, fragmentShaderContent);
    const program = programManager.getProgramByName("triangle");

    const vao = vaoManager.createVAO({
        name: "triangle",
        program,
        vaoLayout,
        buffers: [buffer],
    });

    const image = await Graphic.loadImage("../common/textures/color-grid.png");
    const texture = new Graphic.Texture2D({
        name: "test",
        openGL: system.view.openGL,
        width: 1024,
        height: 1024,
        internalFormat: "RGBA",
        parameters: new Graphic.TextureParameters(),
    });

    texture.putData({
        level: 0,
        format: "RGBA",
        type: "UNSIGNED_BYTE",
        data: image,
    });

    texture.bind();
    texture.applyParameters();

    system.animationLoop.on("frame", () => {
        program.use();
        vao.bind();
        const {openGLPrimitiveType, verticesCount} = vao.vaoLayout.allocation;
        // openGL.uniform1iv(program.uniformLocations['textureSampler']);
        system.view.openGL.drawArrays(openGLPrimitiveType, 0, verticesCount);
    });
});
