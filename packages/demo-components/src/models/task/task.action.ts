import { createActions } from 'redux-actions';
// @ts-ignore
import { identity } from 'ramda';

export default createActions({
  task: {
    set: identity,
    reset: identity,
    fetchSelectNodes: identity,
    submit: identity,
    reject: identity,
    revoke: identity,
  },
});
