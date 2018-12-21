import { utils, api } from 'demo-common';
import wrappedApplyActions from '../apply/apply.action';
import { Apply, ApplyServer } from '../../types/Apply';

const { unwrapActions } = utils;

const applyActions = unwrapActions(wrappedApplyActions);

interface TaskState {
  taskId?: string;
  processId?: string;
}

const defaultState = () => ({} as TaskState);

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
    *submit({ payload }, { call, put, select }) {
      const { opinion, selectKey, selectValue } = payload;
      const { taskId } = yield select(state => ({
        taskId: state.task.taskId,
      }));
      try {
        yield put.resolve(applyActions.save());
        yield call(api.workflowDemo.me_todo_list_taskId_patch, {
          path: { taskId },
          data: { opinion, selectKey, selectValue },
        });
      } catch (e) {
        utils.showError(e.message);
      }
    },
  },
};
