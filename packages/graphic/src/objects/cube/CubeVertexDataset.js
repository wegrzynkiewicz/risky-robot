import {Vector3} from "../../math";

export default class CubeVertexDataset {

    constructor() {
        const INDICES = 6 * 6;

        this.vertices = [];
        this.indices = new Uint16Array(INDICES);

        // top
        this.put("-++");
        this.put("+++");
        this.put("++-");
        this.put("-+-");

        // down
        this.put("---");
        this.put("+--");
        this.put("+-+");
        this.put("--+");

        // front
        this.put("--+");
        this.put("+-+");
        this.put("+++");
        this.put("-++");

        // back
        this.put("+--");
        this.put("---");
        this.put("-+-");
        this.put("++-");

        // left
        this.put("---");
        this.put("--+");
        this.put("-++");
        this.put("-+-");

        // right
        this.put("+-+");
        this.put("+--");
        this.put("++-");
        this.put("+++");

        const indicesOrder = 0;
        for (let i = 0; i < 6; i++) {
            for (let index of [0, 1, 2, 0, 2, 3]) {
                const vertexIndex = i * 4 + index;
                this.indices[indicesOrder++] = vertexIndex;
            }
        }
    }

    put(plus) {
        const axes = plus.split("").map(axis => axis === "+" ? 1 : -1);
        const vertex = Vector3.fromValues(...axes);
        this.vertices.push(vertex);
    }
}
