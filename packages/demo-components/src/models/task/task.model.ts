import { utils, api } from 'demo-common';
import { OperationType } from 'demo-common/src/enums/OperationType.enum';
import { goBack } from 'react-router-redux';
import wrappedTaskActions from './task.action';

const { unwrapActions } = utils;

const taskActions = unwrapActions(wrappedTaskActions);

export interface SelectNode {
  id: string;
  name: string;
}

interface TaskState {
  taskId?: string;
  processInstanceId?: string;
  selectNodes?: Array<SelectNode>;
  selectNodesLoadError: boolean;
}

const defaultState = () => ({} as TaskState);

export default {
  namespace: 'task',
  state: defaultState(),
  reducers: {
    set(state, { payload }) {
      return { ...state, ...payload };
    },
    reset() {
      return defaultState();
    },
    fetchSelectNodesError(state) {
      return { ...state, selectNodesLoadError: true };
    },
  },
  effects: {
    *fetchSelectNodes({ payload: operationType }, { call, put, select }) {
      const taskId = yield select(state => state.task.taskId);
      if (!taskId) return;

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
        yield put(taskActions.fetchSelectNodesError());
        utils.popup.error(`提交节点加载失败, ${e.message}`);
      }
    },
    *submit({ payload }, { call, put, select }) {
      const { opinion, selectKey, selectValue } = payload;
      const taskId = yield select(state => state.task.taskId);
      yield call(api.workflowDemo.me_todo_list_taskId_patch, {
        path: { taskId },
        data: { opinion, selectKey, selectValue },
      });
      utils.popup.success('提交成功');
      yield put(goBack());
    },
    *reject({ payload }, { call, put, select }) {
      const { opinion, selectValue } = payload;
      const taskId = yield select(state => state.task.taskId);
      yield call(api.workflowDemo.me_todo_list_taskId_delete, {
        path: { taskId },
        data: { opinion, targetId: selectValue },
      });
      utils.popup.success('退回成功');
      yield put(goBack());
    },
    *revoke({ payload }, { call, put, select }) {
      const { opinion } = payload;
      const taskId = yield select(state => state.task.taskId);
      yield call(api.workflowDemo.me_revoke_tasks_taskId_patch, {
        path: { taskId },
        data: { opinion },
      });
      utils.popup.success('撤回成功');
      yield put(goBack());
    },
  },
};
