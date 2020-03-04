import assert from 'assert';
import createStateMachine from '../../src/state/createStateMachine';
import sinon from 'sinon';

describe('StateMachine', () => {

    it('should contain valid enable state modifier', () => {
        const enable = sinon.fake();
        const disable = sinon.fake();
        const stateMachine = createStateMachine({
            disable,
            enable,
        });

        stateMachine.enable(4);
        assert.strictEqual(enable.callCount, 1);
        stateMachine.enable(4);
        assert.strictEqual(enable.callCount, 1);
        stateMachine.disable(4);
        assert.strictEqual(disable.callCount, 1);
        stateMachine.disable(4);
        assert.strictEqual(disable.callCount, 1);
        stateMachine.enable(4);
        assert.strictEqual(enable.callCount, 2);
        stateMachine.enable(4);
        assert.strictEqual(enable.callCount, 2);
        stateMachine.enable(5);
        assert.strictEqual(enable.callCount, 3);
    });

    it('should contain valid color state modifier', () => {
        const clearColor = sinon.fake();
        const stateMachine = createStateMachine({clearColor});

        stateMachine.clearColor(1, 1, 1, 1);
        assert.strictEqual(clearColor.callCount, 1);
        stateMachine.clearColor(1, 1, 1, 1);
        assert.strictEqual(clearColor.callCount, 1);
        stateMachine.clearColor(1, 0, 0, 1);
        assert.strictEqual(clearColor.callCount, 2);
        stateMachine.clearColor(1, 0, 0, 1);
        assert.strictEqual(clearColor.callCount, 2);
    });
});
