class CubeVertexDataset {

    constructor() {
        this.vertices = [];

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
    }

    put(plus) {
        const vertex = Vector3.fromArray(plus.split("").map(axis => axis === "+" ? 1 : -1));
        this.vertices.push(vertex);
    }
}

const cubeVertexDataset = new CubeVertexDataset();
export default cubeVertexDataset;
