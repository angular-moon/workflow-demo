import { utils, api } from 'demo-common';
import wrappedDeclareActions from '../apply/apply.action';
import { Apply, ApplyServer } from '../../types/Apply';

const { unwrapActions } = utils;

const declareActions = unwrapActions(wrappedDeclareActions);

const defaultState = () => ({ catalog: {} } as Apply);

export default {
  namespace: 'apply',
  state: defaultState(),
  reducers: {
    set(state, { payload }) {
      return { ...state, ...payload };
    },
    reset(state) {
      return defaultState();
    },
  },
  effects: {
    
  },
};
