export default class ProxyCreator {

    constructor() {
        this.modifiers = [];
    }

    applyStateModifiers(object) {
        for (const modifier of this.modifiers) {
            modifier.call(object);
        }
    }

    createColorStateProxy(parameter, functionName) {
        const modifier = function () {
            this.state[parameter] = new Float32Array(4);
            this.proxies[functionName] = (r, g, b, a) => {
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

    createEnableStateProxy() {
        const modifier = function () {
            this.state["ENABLED"] = Object.create(null);
            this.proxies["enable"] = (enumerable) => {
                const values = this.state["ENABLED"];
                if (values[enumerable] !== true) {
                    values[enumerable] = true;
                    this.openGL.enable(enumerable);
                }
            };
            this.proxies["disable"] = (enumerable) => {
                const values = this.state["ENABLED"];
                if (values[enumerable] !== false) {
                    values[enumerable] = false;
                    this.openGL.disable(enumerable);
                }
            };
            this.proxies["isEnabled"] = (enumerable) => {
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
};
