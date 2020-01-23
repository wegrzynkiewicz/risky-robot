export const createEnableStateMemento = () => {
    return function () {
        this.state["ENABLED"] = Object.create(null);
        this["enable"] = function (enumerable) {
            const value = this.state["ENABLED"];
            if (value[enumerable] !== true) {
                value[enumerable] = true;
                this.openGL.enable(enumerable);
            }
        };
        this["disable"] = function (enumerable) {
            const value = this.state["ENABLED"];
            if (value[enumerable] !== false) {
                value[enumerable] = false;
                this.openGL.disable(enumerable);
            }
        };
    }
};

export const createColorStateMemento = (parameter, functionName) => {
    return function () {
        this.state[parameter] = new Float32Array(4);
        this[functionName] = function (r, g, b, a) {
            const value = this.state[parameter];
            if (value[0] !== r || value[1] !== g || value[2] !== b || value[3] !== a) {
                value[0] = r;
                value[1] = g;
                value[2] = b;
                value[3] = a;
                this.openGL[functionName](r, g, b, a);
            }
        };
    }
};

export const createBindStateMemento = (parameter, functionName) => {
    return function () {
        this.state[parameter] = undefined;
        this[functionName] = function (target, object) {
            const {state} = this;
            if (state[parameter]) {
                state[parameter] = object;
                this.openGL[functionName](target, object);
            }
        };
    }
};
