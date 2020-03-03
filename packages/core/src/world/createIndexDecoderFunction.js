export default function createIndexDecoderFunction ({widthBitShift, heightBitShift}) {
    const perRowElements = 1 << heightBitShift;
    const indexDepthBitShift = widthBitShift + heightBitShift;
    const perSquareElements = 1 << indexDepthBitShift;

    const content = `return {
        x: index % ${perRowElements},
        y: index >> ${indexDepthBitShift},
        z: (index % ${perSquareElements}) >> ${widthBitShift}
    }`;

    const indexDecoderFunction = new Function('index', content);
    Object.defineProperty(indexDecoderFunction, 'name', {value: 'indexDecode', writable: false});

    return indexDecoderFunction;
}

