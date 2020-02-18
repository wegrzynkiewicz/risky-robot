import assert from "assert";
import BinaryStructure from "../../src/types/BinaryStructure";

describe("BinaryStructure", function () {
    it(`should contain valid type`, function () {
        const structure = BinaryStructure.compose({
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
