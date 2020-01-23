import ProxyCreator from "./ProxyCreator";

const proxyCreator = new ProxyCreator();
proxyCreator.createEnableStateProxy();
proxyCreator.createColorStateProxy("BLEND_COLOR", "blendColor");
proxyCreator.createColorStateProxy("COLOR_CLEAR_VALUE", "clearColor");

class StateMachine {
    constructor(openGL) {
        this.openGL = openGL;
        this.proxies = Object.create(null);
        this.state = Object.create(null);
        proxyCreator.applyStateModifiers(this);
    }
}

const proxyHandler = {
    get(target, name) {
        const {openGL, proxies} = target;
        const value = openGL[name];

        if (typeof value !== "function") {
            return value;
        }

        let proxy = proxies[name];
        if (proxy === undefined) {
            proxy = value.bind(openGL);
            proxies[name] = proxy;
            return proxy;
        }

        return proxy;
    }
};

export default function createStateMachine(openGL) {
    const stateMachine = new StateMachine(openGL);
    return new Proxy(stateMachine, proxyHandler);
}
