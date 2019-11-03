import ShaderRepository from "./ShaderRepository";

import terrainVert from "../objects/legacyTerrain/shader/terrain.vert";
import terrainFrag from "../objects/legacyTerrain/shader/terrain.frag";
import pivotVert from "../objects/pivot/shader/pivot.vert";
import pivotFrag from "../objects/pivot/shader/pivot.frag";
import cubeVert from "../objects/cube/shader/cube.vert";
import cubeFrag from "../objects/cube/shader/cube.frag";
import chunkVert from "../objects/chunk/shader/chunk.vert";
import chunkFrag from "../objects/chunk/shader/chunk.frag";
import tankVert from "../objects/tank/shader/tank.vert";
import tankFrag from "../objects/tank/shader/tank.frag";

const shaderRegistry = new ShaderRepository();

shaderRegistry.register("terrain", {vertex: terrainVert, fragment: terrainFrag});
shaderRegistry.register("pivot", {vertex: pivotVert, fragment: pivotFrag});
shaderRegistry.register("cube", {vertex: cubeVert, fragment: cubeFrag});
shaderRegistry.register("chunk", {vertex: chunkVert, fragment: chunkFrag});
shaderRegistry.register("tank", {vertex: tankVert, fragment: tankFrag});

export default shaderRegistry;
