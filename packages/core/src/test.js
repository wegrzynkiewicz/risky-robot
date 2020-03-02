import zlib from 'zlib';

const buffer = new ArrayBuffer(65536);
const dataView = new DataView(buffer);

// for (let i = 0; i < 65536; i++) {
//     dataView.setUint8(i, Math.floor(Math.random() * 5));
// }
// for (let i = 0; i < 65536; i++) {
//     dataView.setUint8(65536 + i, 1);
// }

dataView.setUint8(20, 0xff);

const buf = Buffer.from(buffer);

console.log(buf);
console.log(buf.byteLength);

zlib.brotliCompress(buffer, (error, compressedBuffer) => {
    console.log(compressedBuffer);
    console.log(compressedBuffer.byteLength);
});
