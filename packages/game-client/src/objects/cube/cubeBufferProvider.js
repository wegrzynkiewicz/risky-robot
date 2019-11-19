import cubeVAOLayout from "./cubeVAOLayout";

export default function cubeBufferProvider() {

    const [bufferLayout] = cubeVAOLayout.buffers;
    const vaoAllocation = bufferLayout.createVAOAllocation(cubeVAOLayout.vertices);
    const builder = new VAOPlusBufferBuilder(vaoAllocation);

    // top
    builder.add("-++");
    builder.add("+++");
    builder.add("++-");
    builder.add("-+-");

    // bottom
    builder.add("---");
    builder.add("+--");
    builder.add("+-+");
    builder.add("--+");

    // front
    builder.add("--+");
    builder.add("+-+");
    builder.add("+++");
    builder.add("-++");

    // back
    builder.add("+--");
    builder.add("---");
    builder.add("-+-");
    builder.add("++-");

    // left
    builder.add("---");
    builder.add("--+");
    builder.add("-++");
    builder.add("-+-");

    // right
    builder.add("+-+");
    builder.add("+--");
    builder.add("++-");
    builder.add("+++");
}
