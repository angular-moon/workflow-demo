import { utils, api } from 'demo-common';
import wrappedDeclareActions from '../actions/apply.action';

const { unwrapActions } = utils;

const declareActions = unwrapActions(wrappedDeclareActions);

const defaultState = () => ({ catalog: {} });

const transform2Client = data => ({
  id: data.id,
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
    *save({ payload }, { call, put, select }) {
      try {
        const apply = yield select(state => state.apply);
        // TODO call save api
        // if has apply.id call update
        // else call create
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
