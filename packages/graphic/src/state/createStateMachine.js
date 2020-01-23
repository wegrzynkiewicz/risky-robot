import ProxyCreator from "./ProxyCreator";

const proxyCreator = new ProxyCreator();
proxyCreator.createEnableStateProxy();

proxyCreator.createColorStateProxy("BLEND_COLOR", "blendColor");
proxyCreator.createBoxStateProxy("X_BLEND_FUNC", "blendFunc");

proxyCreator.createColorStateProxy("COLOR_CLEAR_VALUE", "clearColor");

proxyCreator.createNumberStateProxy("DEPTH_CLEAR_VALUE", "clearDepth");
proxyCreator.createNumberStateProxy("DEPTH_FUNC", "depthFunc");

proxyCreator.createNumberStateProxy("FRONT_FACE", "frontFace");
proxyCreator.createNumberStateProxy("CULL_FACE_MODE", "cullFace");

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
