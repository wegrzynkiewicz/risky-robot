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

    constructor({id}) {
        this.id = id;
        this.parent = null;
        this.children = [];
    }

    setParent(newParentNode) {
        if (this.parent) {
            removeChild.call(this.parent, this);
        }
        this.parent = null;
        addChild.call(newParentNode, this);
        this.parent = newParentNode;
    }

    update(game, deltaTime) {
        this.updateChildren(game, deltaTime);
    }

    updateChildren(game, deltaTime) {
        const length = this.children.length;
        for (let i = 0; i < length; i++) {
            const child = this.children[i];
            child.update(game, deltaTime);
        }
    }

    shouldRender(game) {
        return true;
    }

    render(game) {
        this.renderChildren(game);
    }

    renderChildren(game) {
        const length = this.children.length;
        for (let i = 0; i < length; i++) {
            const child = this.children[i];
            if (child.shouldRender(game)) {
                child.render(game);
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
