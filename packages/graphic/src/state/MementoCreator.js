export default class MementoCreator {

    constructor() {
        this.modifiers = [];
    }

    applyStateMementos(object) {
        for (const modifier of this.modifiers) {
            modifier.call(object);
        }
    }

    createColorStateMemento(parameter, functionName) {
        const modifier = function () {
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
        };
        this.modifiers.push(modifier);
    }

    createEnableStateMemento() {
        const modifier = function () {
            this.state["ENABLED"] = Object.create(null);
            this["enable"] = function (enumerable) {
                const values = this.state["ENABLED"];
                if (values[enumerable] !== true) {
                    values[enumerable] = true;
                    this.openGL.enable(enumerable);
                }
            };
            this["disable"] = function (enumerable) {
                const values = this.state["ENABLED"];
                if (values[enumerable] !== false) {
                    values[enumerable] = false;
                    this.openGL.disable(enumerable);
                }
            };
            this["isEnabled"] = function (enumerable) {
                const values = this.state["ENABLED"];
                let value = values[enumerable];
                if (value === undefined) {
                    value = this.openGL.isEnabled(enumerable);
                    values[enumerable] = value;
                }
                return value;
            };
        };
        this.modifiers.push(modifier);
    }

    createDummyStateMemento(functionName) {
        const modifier = function () {
            this[functionName] = function (...args) {
                this.openGL[functionName](...args);
            }
        };
        this.modifiers.push(modifier);
    }
};
