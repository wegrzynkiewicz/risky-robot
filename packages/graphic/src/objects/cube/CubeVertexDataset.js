import {Vector3, Vector2} from "../../math";

const mapping = (char) => {
    switch (char) {
        case "0": return 0.0;
        case "+": return 1.0;
        case "-": return -1.0;
    }
};

export default class CubeVertexDataset {

    constructor() {
        const INDICES = 6 * 6;

        this.vertices = [];
        this.indices = new Uint16Array(INDICES);

        // top
        this.put("-++", "0+", "0+0");
        this.put("+++", "++", "0+0");
        this.put("++-", "+0", "0+0");
        this.put("-+-", "00", "0+0");

        // down
        this.put("---", "0+", "0-0");
        this.put("+--", "++", "0-0");
        this.put("+-+", "+0", "0-0");
        this.put("--+", "00", "0-0");

        // front
        this.put("--+", "0+", "00-");
        this.put("+-+", "++", "00-");
        this.put("+++", "+0", "00-");
        this.put("-++", "00", "00-");

        // back
        this.put("+--", "0+", "00+");
        this.put("---", "++", "00+");
        this.put("-+-", "+0", "00+");
        this.put("++-", "00", "00+");

        // left
        this.put("---", "0+", "-00");
        this.put("--+", "++", "-00");
        this.put("-++", "+0", "-00");
        this.put("-+-", "00", "-00");

        // right
        this.put("+-+", "0+", "+00");
        this.put("+--", "++", "+00");
        this.put("++-", "+0", "+00");
        this.put("+++", "00", "+00");

        const faces = [];

        const indicesOrder = 0;
        for (let i = 0; i < 6; i++) {
            for (let index of [0, 1, 2, 0, 2, 3]) {
                const vertexIndex = i * 4 + index;
                this.indices[indicesOrder++] = vertexIndex;
            }
        }
    }

    put(positionCode, textureCoordsCode, normalCode) {
        const positionAxes = positionCode.split("").map(mapping);
        const position = Vector3.fromValues(...positionAxes);

        const textureCoordsAxes = textureCoordsCode.split("").map(mapping);
        const textureCoords = Vector2.fromValues(...textureCoordsAxes);

        const normalCodeAxes = normalCode.split("").map(mapping);
        const normals = Vector3.fromValues(...normalCodeAxes);

        this.vertices.push({position, textureCoords, normals});
    }
}
