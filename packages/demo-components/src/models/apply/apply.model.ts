import { api, utils } from 'demo-common';
import md5 from 'md5';
import { Apply, ApplyServer } from '../../types/Apply.d';
import wrappedApplyActions from './apply.action';

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
  // for test, 使用名称MD5作为id(支持的类型为Long, 把字母转为数字(ascii))
  /* eslint-disable */
  agentId: data.agent
    ? md5(data.agent)
        .slice(0, 5)
        .split('')
        .map(c => (Number.isInteger(c) ? c : c.charCodeAt()))
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
    *save({ payload: { mode, strict } }, { call, put, select }) {
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
