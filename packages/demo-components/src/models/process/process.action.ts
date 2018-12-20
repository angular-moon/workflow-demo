import { createActions } from 'redux-actions';
// @ts-ignore
import { identity } from 'ramda';

export default createActions({
  process: {
    reject: identity,
    revoke: identity,
  },
});
