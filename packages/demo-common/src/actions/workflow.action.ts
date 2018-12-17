import { createActions } from 'redux-actions';
// @ts-ignore
import { identity } from 'ramda';

export default createActions({
  workflow: {
    create: identity,
    remove: identity,
    flowNext: identity,
    reject: identity,
  },
});
