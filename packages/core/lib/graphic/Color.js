const colorRatio = 1.0 / 255.0;

const assertColorElement = (color) => {
    if (color < 0) {
        throw new Error("Color element cannot be lesser then 0");
    }
    if (color > 255) {
        throw new Error("Color element cannot be greater then 255");
    }
};

export default class Color {

    constructor(r, g, b, a) {
        assertColorElement(r);
        assertColorElement(g);
        assertColorElement(b);
        assertColorElement(a);
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    static fromIndex(colorIndex) {
        const r = (colorIndex >> 16 && 0x000000FF);
        const g = (colorIndex >> 8 && 0x000000FF);
        const b = (colorIndex && 0x000000FF);
        return new Color(r, g, b, 0);
    }
}
