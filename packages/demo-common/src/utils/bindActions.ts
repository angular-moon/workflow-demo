import { bindActionCreators } from 'redux';
import {
  keys, head, compose, reduce,
} from 'ramda';

const postfix = 'BoundActions';

/**
 * 遍历 actions, bind action with dispatch
 */
const bindActions = (actions, dispatch) => {
  const namespace = compose(
    head,
    keys
  )(actions);
  const boundActions = bindActionCreators(actions[namespace], dispatch);
  return { [namespace + postfix]: { ...boundActions } };
};

/**
 * bind has namespace actions (one level)
 * @param  {...object} actionsCollection - action creator object, Usually created by createActions
 * @return {function} dispatch -> object, object key is [namespace + postfix]
 *
 * @example
 * param:
 * const counterActions = createActions({
 *  counter: {
 *    add: identity,
 *    minus: identity
 *  }
 * });
 *
 * return:
 *  // every action creator wrapped into a dispatch call so they may be invoked directly.
 *  counterBoundActions: {
 *    add,
 *    minus
 *  }
 * });
 */
export default (...actionsCollection) => dispatch => {
  const boundActionsCollection = reduce(
    (boundActions, actions) => ({ ...boundActions, ...bindActions(actions, dispatch) }),
    {},
    actionsCollection
  );
  return { ...boundActionsCollection, dispatch };
};
