import BinaryAccessor from "./access/BinaryAccessor";
import BinaryTypes from "./types/BinaryTypes";

export default class Binary {}

Binary.types = new BinaryTypes();
Binary.Accessor = BinaryAccessor;
