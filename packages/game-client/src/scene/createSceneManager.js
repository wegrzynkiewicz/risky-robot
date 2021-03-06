import SceneManager from './SceneManager';
import SceneLayer from './SceneLayer';
import Scene from './Scene';
import TerrainSceneNode from '../objects/legacyTerrain/TerrainSceneNode';
import PivotSceneNode from '../objects/pivot/PivotSceneNode';
import ChunkSceneNode from '../objects/chunk/ChunkSceneNode';
import TankSceneNode from '../objects/tank/TankSceneNode';
import WallSceneNode from '../objects/wall/WallSceneNode';

export default function createSceneManager(game) {

    const sceneManager = new SceneManager();

    const primaryScene = new Scene({
        id: 'primary',
    });
    primaryScene.init(game);

    const chunkLayerScene = new SceneLayer({
        id: 'chunks',
    });

    //const cubeSceneNode = new CubeSceneNode(game);

    const chunkSceneNode = new ChunkSceneNode(game);
    const terrainLayerScene = new SceneLayer({
        id: 'terrain',
    });

    const terrainSceneNode = new TerrainSceneNode(game);

    const tankSceneNode = new TankSceneNode(game);

    const guiLayerScene = new SceneLayer({
        id: 'gui',
    });

    const debugLayerScene = new SceneLayer({
        id: 'debug',
    });

    //const worldSceneNode = new WorldSceneNode(game);
    const wallSceneNode = new WallSceneNode(game);


    const pivotSceneNode = new PivotSceneNode(game);

    sceneManager.addSceneNodeChild(primaryScene);
    primaryScene.addSceneNodeChild(terrainLayerScene);
    primaryScene.addSceneNodeChild(chunkLayerScene);
    primaryScene.addSceneNodeChild(guiLayerScene);
    primaryScene.addSceneNodeChild(debugLayerScene);
    // terrainLayerScene.addSceneNodeChild(terrainSceneNode);
    // debugLayerScene.addSceneNodeChild(pivotSceneNode);
    //chunkLayerScene.addSceneNodeChild(worldSceneNode);
    chunkLayerScene.addSceneNodeChild(wallSceneNode);
    // chunkLayerScene.addSceneNodeChild(chunkSceneNode);
    // chunkLayerScene.addSceneNodeChild(tankSceneNode);

    return sceneManager;
}
