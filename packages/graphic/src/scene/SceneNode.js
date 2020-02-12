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

/**
 * @property {SceneNode[]} children
 */
export default class SceneNode {

    constructor({name}) {
        this.name = name;
        this.parent = null;
        this.children = [];
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
        return null;
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

    debug(writer, depth = 0) {
        const space = "  ".repeat(depth);
        const id = this.id ? `#${this.id} ` : '';
        const type = Object.getPrototypeOf(this).constructor.name;
        writer(`${space}${type} ${id}`);
        for (let child of this.children) {
            child.debug(writer, depth + 1);
        }
    }
}
