// @ts-ignore
import { create } from 'state-container';
import { Store } from 'redux';
// @ts-ignore
import { History } from 'history';
import { Model } from 'dva';
import history from './history';

export interface StateContainer {
  _store: Store<any>;
  _history: History;
  injectModel: (model: Model, replace?: boolean) => Model;
}

const stateContainer: StateContainer = create(history, process.env.NODE_ENV);

export default stateContainer;