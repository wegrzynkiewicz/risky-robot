import TypeGenerator from "./types/TypeGenerator";
import TypeRepository from "./types/TypeRepository";

const binaryTypes = new TypeRepository();
const binaryTypesGenerator = new TypeGenerator(binaryTypes);
binaryTypesGenerator.generate();

export {TypeGenerator};
export {TypeRepository};
export {binaryTypes as types};
export {default as TypeAccessor} from "./access/TypeAccessor";
export {default as TypeListAccessor} from "./access/TypeListAccessor";
export {default as StructureAccessor} from "./access/StructureAccessor";
export {default as StructureListAccessor} from "./access/StructureListAccessor";
export {default as GenericType} from "./types/GenericType";
export {default as Component} from "./structute/Component";
export {default as Structure} from "./structute/Structure";
