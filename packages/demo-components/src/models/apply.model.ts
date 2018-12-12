import { utils, api } from 'demo-common';
import { assign } from 'lodash';
import wrappedDeclareActions from '../actions/apply.action';

const { unwrapActions } = utils;

const declareActions = unwrapActions(wrappedDeclareActions);

const defaultState = () => assign({}, { catalog: {} });

const transform2Client = data => ({
  catalog: {
    id: data.stockDirId,
    name: data.stockDirName,
  },
  budget: data.money,
  agent: data.agentName,
});

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
    *fetch({ payload }, { call, put }) {
      try {
        const { data } = yield call(api.workflowDemo.applies_id_get, {
          path: { id: payload },
        });
        // 保存数据

        yield put(declareActions.set(transform2Client(data)));
      } catch (e) {
        console.log(e);
      }
    },
  },
};
