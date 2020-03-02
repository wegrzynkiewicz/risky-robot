import * as glHelper from '../helpers/glHelper';

const step = 0.5;
const yOffset = 0.5;

export default class WallVerticesGenerator {

    constructor({bevel}) {
        this.bevel = bevel;
    }

    generateVerticesPosition() {

        const map = {
            '+': step,
            '-': -step,
            'a': -step + this.bevel,
            'b': step - this.bevel,
        };

        const pos = (pattern) => {
            const [x, y, z] = pattern.split('');
            return glHelper.vec3(map[x], map[y] + yOffset, map[z]);
        };

        const positions = [
            /*  0 */ pos('--+'),
            /*  1 */ pos('+-+'),
            /*  2 */ pos('+--'),
            /*  3 */ pos('---'),

            /*  4 */ pos('-++'),
            /*  5 */ pos('+++'),
            /*  6 */ pos('++-'),
            /*  7 */ pos('-+-'),

            /*  8 */ pos('a+b'),
            /*  9 */ pos('b+b'),
            /* 10 */ pos('b+a'),
            /* 11 */ pos('a+a'),

            /* 12 */ pos('a++'),
            /* 13 */ pos('b++'),
            /* 14 */ pos('++b'),
            /* 15 */ pos('++a'),

            /* 16 */ pos('b+-'),
            /* 17 */ pos('a+-'),
            /* 18 */ pos('-+a'),
            /* 19 */ pos('-+b'),
        ];

        return positions;
    }

    generateVertivesUVMapping() {

        const map = {
            '+': 1.0,
            '-': 0.0,
            'a': this.bevel,
            'b': 1.0 - this.bevel,
        };

        const uv = (pattern) => {
            const [s, t] = pattern.split('');
            return glHelper.vec2(map[s], map[t]);
        };

        const mapping = [
            /*  0 */ {front: uv('-+'), left: uv('++')},
            /*  1 */ {front: uv('++'), right: uv('-+')},
            /*  2 */ {back: uv('-+'), right: uv('++')},
            /*  3 */ {back: uv('++'), left: uv('-+')},

            /*  4 */ {front: uv('--'), left: uv('+-')},
            /*  5 */ {front: uv('+-'), right: uv('--')},
            /*  6 */ {back: uv('--'), right: uv('+-')},
            /*  7 */ {back: uv('+-'), left: uv('+-')},

            /*  8 */ {top: uv('ab'), front: uv('a-'), left: uv('b-')},
            /*  9 */ {top: uv('bb'), front: uv('b-'), right: uv('a-')},
            /* 10 */ {top: uv('ba'), back: uv('a-'), right: uv('b-')},
            /* 11 */ {top: uv('aa'), back: uv('b-'), left: uv('a-')},

            /* 12 */ {top: uv('a+'), front: uv('a-'), left: uv('+-')},
            /* 13 */ {top: uv('b+'), front: uv('b-'), right: uv('--')},
            /* 14 */ {top: uv('+b'), front: uv('+-'), right: uv('a-')},
            /* 15 */ {top: uv('+a'), back: uv('--'), right: uv('b-')},

            /* 16 */ {top: uv('b-'), back: uv('a-'), right: uv('+-')},
            /* 17 */ {top: uv('a-'), back: uv('b-'), left: uv('--')},
            /* 18 */ {top: uv('-a'), back: uv('+-'), left: uv('a-')},
            /* 19 */ {top: uv('-b'), front: uv('--'), left: uv('b-')},
        ];

        return mapping;
    }
}

