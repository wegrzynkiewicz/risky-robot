const colorRatio = 1.0 / 255.0;

const assertColorElement = (color) => {
    if (color < 0.0) {
        throw new Error("Color element cannot be lesser then 0.0");
    }
    if (color > 1.0) {
        throw new Error("Color element cannot be greater then 1.0");
    }
};

const hexRegex = new RegExp("^\#([A-Fa-f0-9]+)$");

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

    toString() {
        return this.toHex();
    }

    toHex() {
        const r = Math.floor(this.r * 255).toString(16);
        const g = Math.floor(this.g * 255).toString(16);
        const b = Math.floor(this.b * 255).toString(16);
        return `#${r}${g}${b}`;
    }

    static fromRandom() {
        return new Color(
            Math.random(),
            Math.random(),
            Math.random(),
            1.0
        );
    }

    static fromIndex(colorIndex) {
        const r = (colorIndex >> 16 & 0x000000FF) * colorRatio;
        const g = (colorIndex >> 8 & 0x000000FF) * colorRatio;
        const b = (colorIndex & 0x000000FF) * colorRatio;
        return new Color(r, g, b, 1.0);
    }

    static fromHex(colorHex) {
        const matches = hexRegex.exec(colorHex);
        if (!matches) {
            throw new Error("Invalid color hex");
        }
        const hex = matches[1];
        const r = parseInt(hex.charAt(0) + hex.charAt(1), 16) * colorRatio;
        const g = parseInt(hex.charAt(2) + hex.charAt(3), 16) * colorRatio;
        const b = parseInt(hex.charAt(4) + hex.charAt(5), 16) * colorRatio;
        return new Color(r, g, b, 1.0);
    }
}
