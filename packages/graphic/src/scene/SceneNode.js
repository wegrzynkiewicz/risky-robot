import Transformation from './Transformation';

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

    addChild(child) {
        if (child.parent) {
            child.parent.removeChild(child);
        }
        child.parent = this;
        this.children.push(child);
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
            this.parent.removeChild(this);
        }
        this.parent = null;
        newParentNode.addChild(this);
        this.parent = newParentNode;
    }

    update(system, context) {
        if (this.parent) {
            this.transformation.updateModelMatrix(this.parent.transformation.modelMatrix);
        }
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
        if (this.target) {
            window.bufferData.accessor.fields.u_modelMatrix.write(this.transformation.modelMatrix);
            window.uniformBuffer.setBufferData(window.bufferData.dataView);
            this.target.render(system, context);
        }
        for (const child of this.children) {
            child.render(system, context);
        }
    }

    /** @private */
    removeChild(child) {
        const index = this.children.indexOf(child);
        if (index === -1) {
            return;
        }
        this.children.splice(index, 1);
        child.parent = null;
    }
}
