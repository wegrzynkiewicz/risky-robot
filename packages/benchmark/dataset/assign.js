export function deconstructing() {
    const constructor = class {
        constructor({x, y}) {
            this.x = x;
            this.y = y;
        }
    };
    return function deconstructing() {
        return new constructor({x: 1, y: 2});
    };
}

export function objectAssing() {
    const constructor = class {
        constructor(args) {
            Object.assign(this, args);
        }
    };
    return function deconstructing() {
        return new constructor({x: 1, y: 2});
    };
}

export function immediately() {
    const constructor = class {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    };
    return function deconstructing() {
        return new constructor(1, 2);
    };
}
