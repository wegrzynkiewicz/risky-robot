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

    getSceneNodeByName(name) {
        if (this.name === name) {
            return this;
        }
        const length = this.children.length;
        for (let i = 0; i < length; i++) {
            const child = this.children[i];
            const searchedSceneNode = child.getSceneNodeByName(name);
            if (searchedSceneNode) {
                return searchedSceneNode;
            }
        }
        throw new Error(`SceneNode named (${name}) not exists.`);
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
        this.updateChildren(system, context);
    }

    updateChildren(system, context) {
        const length = this.children.length;
        for (let i = 0; i < length; i++) {
            const child = this.children[i];
            child.update(system, context);
        }
    }

    shouldRender(system, context) {
        return true;
    }

    render(system, context) {
        this.renderChildren(system, context);
    }

    renderChildren(system, context) {
        const length = this.children.length;
        for (let i = 0; i < length; i++) {
            const child = this.children[i];
            if (child.shouldRender(system, context)) {
                child.render(system, context);
            }
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
