import {createOpenGLInstance} from "robo24-webgl2-mock";

import assert from "assert";
import Shader from "../../src/shader/Shader";

describe("Shader", function () {
    it("should create valid instance", function () {
        new Shader({
            name: "vertexShader",
            type: "VERTEX_SHADER",
            openGL: createOpenGLInstance(),
            shaderContent: {},
        });
    });
});
