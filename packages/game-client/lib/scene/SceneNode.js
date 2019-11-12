/**
 * @property {SceneNode[]} children
 */
export default class SceneNode {

    constructor(options) {
        this.id = options.id;
        this.parent = options.parent || null;
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

    addSceneNodeChild(child) {
        const oldChildParent = child.parent;
        if (oldChildParent) {
            oldChildParent.removeChild(child);
        }
        child.parent = this;
        this.children.push(child);
    }

    removeChild(child) {
        const index = this.children.indexOf(child);
        if (index === -1) {
            return;
        }
        this.children.splice(index, 1);
        child.parent = null;
    }

    addSceneNodeChildren(children) {
        const length = children.length;
        for (let i = 0; i < length; i++) {
            const child = children[i];
            this.addSceneNodeChild(child);
        }
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
