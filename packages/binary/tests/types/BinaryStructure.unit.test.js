import assert from "assert";
import Structure from "../../src/structute/Structure";

describe("BinaryStructure", function () {

    it(`should create simple structure`, function () {
        const structure = Structure.compose({
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
});
