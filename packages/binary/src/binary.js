import TypeGenerator from "./types/TypeGenerator";
import TypeRepository from "./types/TypeRepository";

const binaryTypes = new TypeRepository();
const binaryTypesGenerator = new TypeGenerator(binaryTypes);
binaryTypesGenerator.generate();

export {binaryTypes as types};

export {default as BufferData} from "./access/BufferData";
export {default as StructureAccessor} from "./access/StructureAccessor";
export {default as StructureListAccessor} from "./access/StructureListAccessor";
export {default as TypeAccessor} from "./access/TypeAccessor";
export {default as TypeListAccessor} from "./access/TypeListAccessor";

export {default as Component} from "./structute/Component";
export {default as List} from "./structute/List";
export {default as Structure} from "./structute/Structure";

export {default as AbstractType} from "./types/AbstractType";
export {default as GenericType} from "./types/GenericType";
export {default as ScalarType} from "./types/ScalarType";
export {default as typedArrays} from "./types/typedArrays";
export {TypeGenerator};
export {TypeRepository};
