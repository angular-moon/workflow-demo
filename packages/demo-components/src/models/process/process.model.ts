import { utils, api } from 'demo-common';
import wrappedDeclareActions from '../../models/apply/apply.action';
import { Apply, ApplyServer } from '../../types/Apply';

const { unwrapActions } = utils;

const declareActions = unwrapActions(wrappedDeclareActions);

const defaultState = () => ({ catalog: {} } as Apply);

interface transform2ClientFunc {
  (serverData: ApplyServer): Apply;
}
const transform2Client: transform2ClientFunc = data => ({
  id: data.id,
  catalog: {
    id: data.stockDirId,
    name: data.stockDirName,
  },
  budget: data.money,
  agent: data.agentName,
});

interface transform2ServerFunc {
  (clientData: Apply): ApplyServer;
}
const transform2Server: transform2ServerFunc = data => ({
  agentId: '0', // 没有id, 暂时赋值为0
  agentName: data.agent,
  money: data.budget,
  stockDirId: data.catalog.id,
  stockDirName: data.catalog.name,
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
    *fetch({ payload: applyId }, { call, put }) {
      try {
        const { data } = yield call(api.workflowDemo.applies_id_get, {
          path: { id: applyId },
        });
        // 保存数据

        yield put(declareActions.set(transform2Client(data)));
      } catch (e) {
        console.log(e);
      }
    },
    *save({ payload: processId }, { call, put, select }) {
      try {
        const apply = yield select(state => state.apply);
        let response;
        // no id => post & bind processId
        if (!apply.id) {
          response = yield call(api.workflowDemo.applies_post, {
            data: { ...transform2Server(apply), processId },
          });
        } else {
          response = yield call(api.workflowDemo.applies_id_put, {
            path: { id: apply.id },
            data: { ...transform2Server(apply) },
          });
        }

        // 保存数据
        yield put(declareActions.set(transform2Client(response.data)));
      } catch (e) {
        console.log(e);
      }
    },
  },
};
