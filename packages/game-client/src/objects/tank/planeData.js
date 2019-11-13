import VertexBuffer from "../../graphic/VertexBuffer";

const vertex = new VertexBuffer({
    vertices: 6,
    attributes: [
        {name: "a_VertexPosition", components: 3, type: "f32"},
        {name: "a_VertexTextureCoords", components: 2, type: "f32"},
    ],
});

vertex.float(-1.0, 0.0, 1.0).tex(0.0, 1.0);
vertex.float(1.0, 0.0, 1.0).tex(1.0, 1.0);
vertex.float(1.0, 0.0, -1.0).tex(1.0, 0.0);
vertex.float(-1.0, 0.0, -1.0).tex(0.0, 0.0);
vertex.float(-1.0, 0.0, 1.0).tex(0.0, 1.0);
vertex.float(1.0, 0.0, -1.0).tex(1.0, 0.0);

export default vertex;
