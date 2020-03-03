const universe = {

};

const zone = {
    properties: [
        {type: 'u16', property: 'chunkCount'},
    ],
};

const planet = {

};

const region = {
    properties: [
    ],
};

const regionHeader = {
    properties: [
        {type: 'u16', property: 'chunkCount'},
        {type: 'blob', property: 'chunkHeaders'},
    ],
};

const chunkHeader = {
    properties: [
        {type: 'u32', property: 'offset'},
        {type: 'u32', property: 'length'},
        {type: 'u8', property: 'algorithm'},
    ],
};

const layer = {

};

const unit = {

};
