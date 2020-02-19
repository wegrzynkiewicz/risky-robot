import assert from "assert";
import Structure from "../../src/structute/Structure";

describe("BinaryStructure", function () {
    it(`should contain valid type`, function () {
        const structure = Structure.compose({
            name: "matrices",
            components: [
                {name: "u_Projection", type: "mat4<f32>"},
                {name: "u_Model", type: "mat4<f32>"},
                {name: "u_View", type: "mat4<f32>"},
            ],
        });

        const dataView = structure.createDataView();

        assert.strictEqual(dataView.byteLength, 64 * 3);
    });
});
