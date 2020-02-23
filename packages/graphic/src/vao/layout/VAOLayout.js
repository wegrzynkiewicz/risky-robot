import createBasicLayout from "./createBasicLayout";
import ElementBufferLayout from "./ElementBufferLayout";
import ArrayBufferLayout from "./ArrayBufferLayout";
import Attribute from "../../shader/attribute/Attribute";

export default class VAOLayout {

    constructor({allocation}) {
        this.allocation = allocation;
        this.attributeBufferLayouts = [];
        this.bufferLayoutMap = new Map();
        this.elementBufferLayout = null;
    }

    createBufferLayout(bufferBlueprint) {
        const bufferLayout = bufferBlueprint.createBufferLayout({
            allocation: this.allocation
        });

        if (bufferLayout instanceof ElementBufferLayout) {
            this.elementBufferLayout = bufferLayout;
        } else if (bufferLayout instanceof ArrayBufferLayout) {
            this.attributeBufferLayouts.push(bufferLayout);
        }
        this.bufferLayoutMap.set(bufferLayout.name, bufferLayout);
    }

    getAttributes() {
        const attributes = [];
        for (const attributeBufferLayout of this.attributeBufferLayouts) {
            for (const attributeLayout of attributeBufferLayout.getAttributeLayouts()) {
                const {name, type} = attributeLayout;
                const attribute = new Attribute({name, type});
                attributes.push(attribute);
            }
        }
        return attributes;
    }

    getBufferLayout(bufferName) {
        return this.bufferLayoutMap.get(bufferName);
    }
}

VAOLayout.createBasicLayout = createBasicLayout;
