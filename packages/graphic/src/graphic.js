import * as math from "./math";
import VertexLayoutBlueprint from "./vao/blueprint/VertexLayoutBlueprint";

const graphic = {};

graphic.Vector2 = math.Vector2;
graphic.Vector3 = math.Vector3;
graphic.Vector4 = math.Vector4;
graphic.Matrix2 = math.Matrix2;
graphic.Matrix3 = math.Matrix3;
graphic.Matrix4 = math.Matrix4;

graphic.VertexLayoutBlueprint = VertexLayoutBlueprint;

export default graphic;
