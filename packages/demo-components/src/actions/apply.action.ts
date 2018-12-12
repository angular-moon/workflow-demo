import { createActions } from 'redux-actions';
// @ts-ignore
import { identity } from 'ramda';

export default createActions({
  apply: {
    reset: identity,
    set: identity,
    fetch: identity,
  },
});
