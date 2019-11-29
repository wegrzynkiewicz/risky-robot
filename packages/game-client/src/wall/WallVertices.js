import * as glHelper from "../helpers/glHelper";

export default class WallVertices {

    constructor({step, bevel, yOffset}) {
        const map = {
            "+": step,
            "-": -step,
            "a": -step + bevel,
            "b": step - bevel,
        };

        this.pos = (pattern) => {
            const [x, y, z] = pattern.split("");
            return glHelper.vec3(
                map[x],
                map[y] + yOffset,
                map[z],
            );
        }
    }

    generate() {
        const vertices = [
            {pos: this.pos("--+")},
            {pos: this.pos("+-+")},
            {pos: this.pos("+--")},
            {pos: this.pos("---")},

            {pos: this.pos("-++")},
            {pos: this.pos("+++")},
            {pos: this.pos("++-")},
            {pos: this.pos("-+-")},

            {pos: this.pos("a+b")},
            {pos: this.pos("b+b")},
            {pos: this.pos("b+a")},
            {pos: this.pos("a+a")},

            {pos: this.pos("a++")},
            {pos: this.pos("b++")},
            {pos: this.pos("++b")},
            {pos: this.pos("++a")},

            {pos: this.pos("b+-")},
            {pos: this.pos("a+-")},
            {pos: this.pos("-+a")},
            {pos: this.pos("-+b")},
        ];

        return vertices;
    }
}

