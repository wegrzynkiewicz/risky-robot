export default class BufferData {

    constructor({dataView, accessor}) {
        this.dataView = dataView;
        this.accessor = accessor;
    }

    static createFromStructure(structure) {
        const dataView = structure.createDataView();
        const accessor = structure.createAccessor({
            dataView,
            byteOffset: 0
        });

        return new BufferData({dataView, accessor});
    }
}
