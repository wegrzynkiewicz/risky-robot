import * as Frontend from 'robo24-frontend';
import fragmentShaderContent from './shader.frag';
import vertexShaderContent from './shader.vert';

const {Graphic} = Frontend;

function start() {
    const canvas = document.getElementById('canvas');
    const system = Frontend.createBasicSystem({
        canvas,
        window,
    });
    const {view} = system;

    const layout = Graphic.VAOLayout.createBasicLayout({
        attributes: [
            {
                batch: 0,
                buffer: 'primary',
                name: 'a_Position',
                type: 'vec3<f32>',
            },
        ],
        indicesCount: 0,
        openGLPrimitiveType: WebGL2RenderingContext.TRIANGLES,
        verticesCount: 3,
    });

    const bufferLayout = layout.getBufferLayout('primary');
    const dataView = bufferLayout.createDataView();

    const positionAttributeLayout = bufferLayout.getAttributeLayoutByName('a_Position');
    const positionAccessor = positionAttributeLayout.createAccessor({dataView});
    positionAccessor.writeElement(0, [-0.5, -0.5, 0]);
    positionAccessor.writeElement(1, [0.5, -0.5, 0]);
    positionAccessor.writeElement(2, [-0.5, 0.5, 0]);

    const {bufferManager, vaoManager} = view;

    const buffer = bufferManager.createArrayBuffer({
        bufferLayout,
        name: 'triangle',
        usage: WebGL2RenderingContext.STATIC_DRAW,
    });
    buffer.setBufferData(dataView);

    const programFactory = new Graphic.ContentProgramFactory({view});
    const program = programFactory.createProgram({
        fragment: fragmentShaderContent,
        name: 'triangle',
        vertex: vertexShaderContent,
    });

    const vao = vaoManager.createVAO({
        attributeBuffers: [buffer],
        layout,
        name: 'triangle',
        program,
    });

    system.animationLoop.on('frame', () => {
        program.use();
        vao.bind();
        const {openGLPrimitiveType, verticesCount} = vao.layout.allocation;
        system.view.openGL.drawArrays(openGLPrimitiveType, 0, verticesCount);
    });
}

document.addEventListener('DOMContentLoaded', () => setImmediate(start));
