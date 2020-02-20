import assert from "assert";
import * as Binary from "../..";

describe("BinaryStructure", function () {

    it(`should create simple structure`, function () {
        const structure = Binary.Structure.compose({
            name: "data",
            components: [
                {name: "matrix", type: "mat3<u32>"},
                {name: "vector", type: "vec2<u32>"},
                {name: "scalar", type: "u32"},
            ],
        });

        const dataView = structure.createDataView();
        const accessor = structure.createAccessor({dataView});
        assert.strictEqual(dataView.byteLength, 36 + 8 + 4);
        assert.strictEqual(accessor['matrix'].type.byteLength, 36);
        assert.strictEqual(accessor['vector'].type.byteLength, 8);
        assert.strictEqual(accessor['scalar'].type.byteLength, 4);

        accessor['scalar'].write(0, 0x11111111);
        assert.strictEqual(dataView.getUint32(44, true), 0x11111111);

        const typedArray = accessor['vector'].type.createTypedArray(1).fill(0x2);
        accessor['vector'].write(0, typedArray);
        assert.strictEqual(dataView.getUint32(36, true), 0x2);
        assert.strictEqual(dataView.getUint32(40, true), 0x2);
    });

    it(`should create nested structure`, function () {

        const lightStructure = Binary.Structure.compose({
            name: "Light",
            components: [
                {name: "position", type: "vec3<f32>"},
                {name: "color", type: "vec3<f32>"},
            ],
        });

        const structure = Binary.Structure.compose({
            name: "Block",
            components: [
                {name: "ambient", type: "vec3<f32>"},
                {name: "light", type: lightStructure, count: 2},
            ],
        });

        const dataView = structure.createDataView();
        const accessor = structure.createAccessor({dataView});
        assert.strictEqual(dataView.byteLength, 12 + (12 + 12) * 2);
        assert.strictEqual(accessor['ambient'].type.byteLength, 12);
        assert.strictEqual(accessor['light'].type.byteLength, 24);
    });
});
