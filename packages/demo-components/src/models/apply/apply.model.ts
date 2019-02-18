import { api, utils } from 'demo-common';
import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { Apply, ApplyServer } from '../../types/Apply.d';
import wrappedApplyActions from './apply.action';
import { Action } from 'redux-actions';

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
  // for test, 使用名称生成id
  /* eslint-disable */
  agentId: data.agent
    ? data.agent
        .slice(0, 5)
        .split('')
        .map(c => c.charCodeAt(0))
        .join('')
    : undefined,
  /* eslint-enable */
  agentName: data.agent,
  money: data.budget,
  stockDirId: data.catalog.id,
  stockDirName: data.catalog.name,
});

export default {
  namespace: 'apply',
  state: defaultState(),
  reducers: {
    set(state, { payload }: AnyAction) {
      return { ...state, ...payload };
    },
    reset(state) {
      return defaultState();
    },
  },
  effects: {
    *fetch({ payload: applyId }: AnyAction, { call, put }: EffectsCommandMap) {
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
    *save({ payload: { mode, strict } }: AnyAction, { call, put, select }: EffectsCommandMap) {
      try {
        const { apply, processInstanceId } = yield select(state => ({
          apply: state.apply,
          processInstanceId: state.task.processInstanceId,
        }));
        let response;
        // no id => post & bind processInstanceId
        if (!apply.id) {
          response = yield call(api.workflowDemo.applies_post, {
            params: { strict },
            data: { ...transform2Server(apply), processInstanceId },
          });
        } else {
          response = yield call(api.workflowDemo.applies_id_put, {
            path: { id: apply.id },
            params: { mode, strict },
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
