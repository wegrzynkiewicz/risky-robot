function mapping(char) {
    switch (char) {
        case '0':
            return 0.0;
        case '+':
            return 1.0;
        case '-':
            return -1.0;
        default:
            throw new Error('DomainError');
    }
}

function parse(...args) {
    return args.map((arg) => arg.split('').map(mapping));
}

export default function emitVertexDataset(callback) {

    const emit = (...args) => callback(...parse(...args));

    // Position, textureCords, normal, tangent

    // Top
    emit('-++', '0+', '0+0', '+00');
    emit('+++', '++', '0+0', '+00');
    emit('++-', '+0', '0+0', '+00');
    emit('-+-', '00', '0+0', '+00');

    // Down
    emit('---', '0+', '0-0', '-00');
    emit('+--', '++', '0-0', '-00');
    emit('+-+', '+0', '0-0', '-00');
    emit('--+', '00', '0-0', '-00');

    // Front
    emit('--+', '0+', '00-', '+00');
    emit('+-+', '++', '00-', '+00');
    emit('+++', '+0', '00-', '+00');
    emit('-++', '00', '00-', '+00');

    // Back
    emit('+--', '0+', '00+', '-00');
    emit('---', '++', '00+', '-00');
    emit('-+-', '+0', '00+', '-00');
    emit('++-', '00', '00+', '-00');

    // Left
    emit('---', '0+', '-00', '00-');
    emit('--+', '++', '-00', '00-');
    emit('-++', '+0', '-00', '00-');
    emit('-+-', '00', '-00', '00-');

    // Right
    emit('+-+', '0+', '+00', '00+');
    emit('+--', '++', '+00', '00+');
    emit('++-', '+0', '+00', '00+');
    emit('+++', '00', '+00', '00+');
}
