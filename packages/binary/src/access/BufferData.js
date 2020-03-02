export default class BufferData {

    constructor({dataView, accessor}) {
        this.dataView = dataView;
        this.accessor = accessor;
    }

    static createFromStructure(structure) {
        const dataView = structure.createDataView();
        const accessor = structure.createAccessor({
            byteOffset: 0,
            dataView,
        });

        return new BufferData({
            accessor,
            dataView,
        });
    }
}
