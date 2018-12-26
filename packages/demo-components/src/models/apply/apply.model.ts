import { utils, api } from 'demo-common';
import wrappedApplyActions from './apply.action';
import { Apply, ApplyServer } from '../../types/Apply';
import { success } from '../../../../demo-common/src/utils/popup';

const { unwrapActions } = utils;

const applyActions = unwrapActions(wrappedApplyActions);

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
        yield put(applyActions.set(transform2Client(data)));
      } catch (e) {
        utils.popup.error(e.message);
      }
    },
    *save({ payload: mode }, { call, put, select }) {
      try {
        const { apply, processInstanceId } = yield select(state => ({
          apply: state.apply,
          processInstanceId: state.task.procprocessInstanceIdessId,
        }));
        let response;
        // no id => post & bind processInstanceId
        if (!apply.id) {
          response = yield call(api.workflowDemo.applies_post, {
            data: { ...transform2Server(apply), processInstanceId },
          });
        } else {
          response = yield call(api.workflowDemo.applies_id_put, {
            path: { id: apply.id },
            mode,
            data: { ...transform2Server(apply) },
          });
        }
        utils.popup.success('保存成功');
        // 保存数据
        yield put(applyActions.set(transform2Client(response.data)));
      } catch (e) {
        utils.popup.error(e.message);
      }
    },
  },
};
