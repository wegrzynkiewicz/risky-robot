import * as Frontend from "robo24-frontend";

import vertexShaderContent from "./shader.vert";
import fragmentShaderContent from "./shader.frag";

const {Graphic} = Frontend;

const start = async () => {
    const canvas = document.getElementById("canvas");
    const system = Frontend.createBasicSystem({window, canvas});
    const {view} = system;

    const layout = Graphic.VAOLayout.createBasicLayout({
        openGLPrimitiveType: WebGL2RenderingContext["TRIANGLES"],
        verticesCount: 3,
        indicesCount: 0,
        attributes: [
            {buffer: "primary", batch: 0, location: 0, name: "a_Position", type: "vec3<f32>"},
            {buffer: "primary", batch: 0, location: 1, name: "a_TexCoords", type: "vec2<f32>"},
        ],
    });

    const bufferLayout = layout.getBufferLayout("primary");
    const dataView = bufferLayout.createDataView();

    const positionAttributeLayout = bufferLayout.getAttributeLayoutByName("a_Position");
    const positionAccessor = positionAttributeLayout.createAccessor({dataView});
    positionAccessor.writeElement(0, [-0.5, -0.5, 0]);
    positionAccessor.writeElement(1, [0.5, -0.5, 0]);
    positionAccessor.writeElement(2, [-0.5, 0.5, 0]);

    const textureCoordsAttributeLayout = bufferLayout.getAttributeLayoutByName("a_TexCoords");
    const textureCoordsAccessor = textureCoordsAttributeLayout.createAccessor({dataView});
    textureCoordsAccessor.writeElement(0, [0, 0.5]);
    textureCoordsAccessor.writeElement(1, [0.5, 0.5]);
    textureCoordsAccessor.writeElement(2, [0, 0]);

    const {bufferManager, vaoManager} = system.view;

    const buffer = bufferManager.createArrayBuffer({
        name: "triangle",
        usage: WebGL2RenderingContext["STATIC_DRAW"],
        bufferLayout
    });
    buffer.setBufferData(dataView);

    const programFactory = new Graphic.ContentProgramFactory({view});
    const program = programFactory.createProgram({
        name: "triangle",
        fragment: fragmentShaderContent,
        vertex: vertexShaderContent,
    });

    const vao = vaoManager.createVAO({
        name: "triangle",
        program,
        layout,
        attributeBuffers: [buffer],
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
        const {openGLPrimitiveType, verticesCount} = vao.layout.allocation;
        // openGL.uniform1iv(program.uniformLocations['textureSampler']);
        system.view.openGL.drawArrays(openGLPrimitiveType, 0, verticesCount);
    });
};

document.addEventListener("DOMContentLoaded", () => setImmediate(start));
