import Core from 'robo24-core';
import registerActions from './actions/registerActions';

export default class NativeBundle extends Core.Bundle {

    register(core) {
        registerActions(core.actionRegistry);
    }
}
