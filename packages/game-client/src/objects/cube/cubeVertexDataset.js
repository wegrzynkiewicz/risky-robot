const cubeVertexDataset = new class CubeVertexDataset {

    constructor() {
        this.vertices = [];

        // top
        this.put("-++");
        this.put("+++");
        this.put("++-");
        this.put("-+-");

        // bottom
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
        const vertex = plus.split("").map(c => parseFloat(`${c}0.5`));
        this.vertices.push(vertex);
    }
};

export default cubeVertexDataset;
