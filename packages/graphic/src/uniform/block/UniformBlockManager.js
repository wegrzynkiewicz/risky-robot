import UniformBindingPoint from "./UniformBindingPoint";

export default class UniformBlockManager {

    constructor({view}) {
        this.view = view;

        this.uniformBindingPoints = new Map();

        this.maxUniformBufferBindings = this.view.openGL.getParameter(
            WebGL2RenderingContext["MAX_UNIFORM_BUFFER_BINDINGS"]
        );

        this.activeBindingPoints = new Array(this.maxUniformBufferBindings);
    }

    checkUniformBlockBinding(program) {
        for (const uniformBlock of program.uniformBlocks) {
            const {uniformBindingPoint} = uniformBlock;
            if (!uniformBindingPoint) {
                throw new Error("Unexpected uniform block binding.");
            }

            if (uniformBindingPoint.bindingIndex === null) {
                const bindingIndex = this.findOptimalBindingIndex();
                uniformBindingPoint.bindingIndex = bindingIndex;
                uniformBindingPoint.bufferBinding();
                this.activeBindingPoints[bindingIndex] = uniformBindingPoint;
            }

            if (uniformBlock.bindingIndex !== uniformBindingPoint.bindingIndex) {
                uniformBlock.uniformBlockBinding(uniformBindingPoint.bindingIndex);
            }
        }
    }

    createBindingPoint({blockName, uniformBuffer, byteOffset, byteLength}) {
        const uniformBindingPoint = new UniformBindingPoint({
            uniformBuffer,
            byteOffset,
            byteLength,
        });
        this.uniformBindingPoints.set(blockName, uniformBindingPoint);
        return uniformBindingPoint;
    }

    findOptimalBindingIndex() {
        for (let i = 0; i < this.maxUniformBufferBindings; i++) {
            const bindingPoint = this.activeBindingPoints[i];
            if (!bindingPoint) {
                return i;
            }
        }

        // TODO: better algorithm to find unused binding points
        const lastBindingIndex = this.maxUniformBufferBindings - 1;
        bindingPoint[lastBindingIndex].clearBindingIndex();
        return lastBindingIndex;
    }
}
