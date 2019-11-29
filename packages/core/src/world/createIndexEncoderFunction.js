export default function createIndexEncoderFunction ({widthBitShift, heightBitShift}) {
    const indexDepthBitShift = widthBitShift + heightBitShift;
    const indexHeightBitShift = widthBitShift;
    const content = `return (y << ${indexDepthBitShift}) + (z << ${indexHeightBitShift}) + x;`;
    const indexEncoderFunction = new Function("x", "y", "z", content);
    Object.defineProperty(indexEncoderFunction, 'name', {value: "indexEncode", writable: false});

    return indexEncoderFunction;
};

