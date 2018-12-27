import { createActions } from 'redux-actions';

const identity = id => id;

const counterActions = createActions({
  counter: {
    add: identity,
    minus: identity,
    delayAdd: identity,
  },
});

export default counterActions;

export const { add, minus, delayAdd } = counterActions.counter;
