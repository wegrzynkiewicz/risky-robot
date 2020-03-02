import Core from 'robo24-core';

const regionData = [
    '................',
    '...X..XXX..X..X.',
    '..XXX......X..X.',
    '...X.......X....',
    '.X....X.XX...XX.',
    '.XX..XX.X..X..X.',
    '................',
    '.X...X..XXX.....',
    '.XX.XX...X...X..',
    '.X...X......XXX.',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
];

const builder = new Core.ChunkConstructorBuilder();
const Chunk = builder.build({widthBitShift: 4, heightBitShift: 4, depthBitShift: 0});
const chunk = new Chunk();

chunk.allocateBuffer();

let offset = 0;
for (let row of regionData) {
    for (let char of row) {
        chunk.dataView.setInt8(offset++, char === 'X' ? 1 : 0);
    }
}

const wallTestingRegionData = chunk;

export default wallTestingRegionData;
