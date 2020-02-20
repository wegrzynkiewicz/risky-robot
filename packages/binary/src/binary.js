import TypeGenerator from "./types/TypeGenerator";
import TypeRepository from "./types/TypeRepository";

const binaryTypes = new TypeRepository();
const binaryTypesGenerator = new TypeGenerator(binaryTypes);
binaryTypesGenerator.generate();

export {TypeGenerator};
export {TypeRepository};
export {binaryTypes as types};
export {default as ComponentAccessor} from "./access/ComponentAccessor";
export {default as Component} from "./structute/Component";
export {default as Structure} from "./structute/Structure";
