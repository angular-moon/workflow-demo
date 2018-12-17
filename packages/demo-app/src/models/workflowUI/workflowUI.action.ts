import { createActions } from 'redux-actions';
// @ts-ignore
import { identity } from 'ramda';

export default createActions({
  workflowUI: {
    reset: identity,
    fetch: identity,
  },
});
