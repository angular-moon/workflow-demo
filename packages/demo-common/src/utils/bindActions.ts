import { bindActionCreators, compose, ActionCreatorsMapObject, Dispatch } from 'redux';
import { keys, head } from 'ramda';
import { ActionFunctionAny, Action } from 'redux-actions';

const postfix = 'BoundActions';

export interface NamespaceActions {
  [namespace: string]: ActionCreatorsMapObject | ActionFunctionAny<Action<any>>;
}

interface BindActions {
  (actions: NamespaceActions | any, dispatch: Dispatch): NamespaceActions;
}

/**
 * bind has namespace actions (one level)
 */
const bindActions: BindActions = (actions, dispatch) => {
  const namespace = compose<string>(
    head,
    keys
  )(actions);
  const boundActions = bindActionCreators(actions[namespace], dispatch);
  return { [namespace + postfix]: { ...boundActions } };
};

interface BindActionsCollection {
  (...actionsCollection: NamespaceActions[]): (dispatch: Dispatch) => any;
}

/**
 * bind has namespace Array<actions> (one level)
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
 *  * every action creator wrapped into a dispatch call so they may be invoked directly.
 *  counterBoundActions: {
 *    add,
 *    minus
 *  }
 * });
 */
const bindActionsCollection: BindActionsCollection = (...actionsCollection) => dispatch => {
  const boundActionsCollection = actionsCollection.reduce(
    (boundActions, actions) => ({
      ...boundActions,
      ...bindActions(actions, dispatch),
    }),
    {}
  );
  return { ...boundActionsCollection };
};

export default bindActionsCollection;
