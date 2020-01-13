document.addEventListener('DOMContentLoaded', () => {
    const canvas = window.document.getElementById('canvas');
    const openGL = canvas.getContext('webgl2');

    if (!openGL) {
        throw new Error('Unable to initialize WebGL. Your browser or machine may not support it.');
    }


});
