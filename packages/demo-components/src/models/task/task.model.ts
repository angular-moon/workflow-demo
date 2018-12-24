import { utils, api } from 'demo-common';
import { OperationType } from 'demo-common/src/enums/OperationType.enum';
import { goBack } from 'react-router-redux';
import wrappedApplyActions from '../apply/apply.action';
import wrappedTaskActions from '../task/task.action';

const { unwrapActions } = utils;

const applyActions = unwrapActions(wrappedApplyActions);
const taskActions = unwrapActions(wrappedTaskActions);

export interface SelectNode {
  id: string;
  name: string;
}

interface TaskState {
  taskId?: string;
  processId?: string;
  selectNodes: Array<SelectNode>;
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
    *fetchSelectNodes({ payload: operationType }, { call, put, select }) {
      const taskId = yield select(state => state.task.taskId);
      const selectNodesApi =
        operationType === OperationType.SUBMIT
          ? api.workflowDemo.process_instances_complete_nodes_get
          : api.workflowDemo.process_instances_reject_nodes_get;
      try {
        const { data } = yield call(selectNodesApi, {
          params: { taskId },
        });
        yield put(taskActions.set({ selectNodes: data }));
      } catch (e) {
        utils.showError(e.message);
      }
    },
    *submit({ payload }, { call, put, select }) {
      const { opinion, selectKey, selectValue } = payload;
      const taskId = yield select(state => state.task.taskId);
      try {
        yield put.resolve(applyActions.save());
        yield call(api.workflowDemo.me_todo_list_taskId_patch, {
          path: { taskId },
          data: { opinion, selectKey, selectValue },
        });
        yield put(goBack());
      } catch (e) {
        utils.showError(e.message);
      }
    },
  },
};
