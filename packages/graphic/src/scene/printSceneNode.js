let text = "";

function traverse(sceneNode, nodeStructure = "", childrenStructure = "") {
    let {name, target, children, sceneNodeId} = sceneNode;
    name = name ? `${name} ` : '';
    target = target ? Object.getPrototypeOf(target).constructor.name : "";
    text += (`${nodeStructure}#${sceneNodeId} ${name}${target}\n`);
    const childrenLength = children.length;
    for (let i = 0; i < childrenLength; i++) {
        const child = children[i];
        const isLast = (childrenLength - 1) === i;
        const newChildStructure = childrenStructure + (isLast ? "└╴" : "├╴");
        const newChildrenStricture = childrenStructure + (isLast ? "  " : "│ ");
        traverse(child, newChildStructure, newChildrenStricture);
    }
}

export default function printSceneNode(sceneNode) {
    text = "";
    traverse(sceneNode);
    console.log(text.toString());
}
