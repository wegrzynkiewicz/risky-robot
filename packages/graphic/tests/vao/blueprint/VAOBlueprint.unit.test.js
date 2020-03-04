import VAOLayoutBlueprint from '../../../src/vao/blueprint/VAOLayoutBlueprint';

describe('VAOLayoutBlueprint', () => {
    it('should create valid layout object', () => {
        const blueprint = new VAOLayoutBlueprint({
            attributeBufferBlueprints: [
                new VAOLayoutBlueprint.ArrayBuffer({
                    batchBlueprints: [
                        new VAOLayoutBlueprint.AttributeBatch({
                            attributeBlueprint: [
                                new VAOLayoutBlueprint.Attribute({
                                    name: 'a_Position',
                                    type: 'vec3<f32>',
                                }),
                                new VAOLayoutBlueprint.Attribute({
                                    name: 'a_Normal',
                                    type: 'vec3<f32>',
                                }),
                            ],
                        }),
                        new VAOLayoutBlueprint.AttributeBatch({
                            attributeBlueprint: [
                                new VAOLayoutBlueprint.Attribute({
                                    name: 'a_Color',
                                    normalize: true,
                                    type: 'vec3<u8>',
                                }),
                            ],
                        }),
                    ],
                    name: 'primary',
                }),
                new VAOLayoutBlueprint.ElementArrayBuffer({
                    name: 'indices',
                }),
            ],
        });

        blueprint.createLayout({
            indicesCount: 4,
            openGLPrimitiveType: WebGL2RenderingContext.TRIANGLES,
            verticesCount: 12,
        });
    });
});
