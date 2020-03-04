import * as Binary from 'robo24-binary';
import * as Graphic from '../../..';

describe('VAOLayoutBlueprint', () => {

    it('should create valid layout object', () => {
        const lightStructure = Binary.Structure.compose({
            components: [
                new Binary.Component({
                    name: 'position',
                    type: 'vec3<f32>',
                }),
                new Binary.Component({
                    name: 'color',
                    type: 'vec3<f32>',
                }),
            ],
            name: 'Light',
        });

        const structure = Binary.Structure.compose({
            components: [
                new Binary.Component({
                    name: 'strength',
                    type: 'f32',
                }),
                new Binary.Component({
                    name: 'ambient',
                    type: 'vec3<f32>',
                }),
                new Binary.Component({
                    count: 3,
                    name: 'light',
                    type: lightStructure,
                }),
            ],
            name: 'TestBlock',
        });

        const blueprint = new Graphic.UniformBlockBlueprint({structure});

        blueprint.createLayout({
            primitive: 'triangle',
            verticesCount: 12,
        });
    });
});
