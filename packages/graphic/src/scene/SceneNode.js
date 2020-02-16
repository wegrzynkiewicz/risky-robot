import Transformation from "./Transformation";

function addChild(child) {
    if (child.parent) {
        removeChild.call(child.parent, child);
    }
    child.parent = this;
    this.children.push(child);
}

function removeChild(child) {
    const index = this.children.indexOf(child);
    if (index === -1) {
        return;
    }
    this.children.splice(index, 1);
    child.parent = null;
}

let sceneNodeId = 0;

/**
 * @property {SceneNode[]} children
 */
export default class SceneNode {

    constructor({name, target}) {
        this.sceneNodeId = sceneNodeId++;
        this.name = name;
        this.target = target;
        this.parent = null;
        this.children = [];
        this.transformation = new Transformation();
    }

    getRoot() {
        let node = this;
        while (true) {
            if (node.parent === null) {
                return node;
            }
            node = node.parent;
        }
    }

    find(callback, thisArg) {
        if (callback.call(thisArg, this)) {
            return this;
        }
        for (const child of this.children) {
            const searchedSceneNode = child.find(callback, thisArg);
            if (searchedSceneNode) {
                return searchedSceneNode;
            }
        }
        return undefined;
    }

    setParent(newParentNode) {
        if (this.parent) {
            removeChild.call(this.parent, this);
        }
        this.parent = null;
        addChild.call(newParentNode, this);
        this.parent = newParentNode;
    }

    update(system, context) {
        for (const child of this.children) {
            child.update(system, context);
        }
    }

    shouldRender(system, context) {
        for (const child of this.children) {
            child.shouldRender(system, context);
        }
    }

    render(system, context) {
        for (const child of this.children) {
            child.render(system, context);
        }
    }
}
