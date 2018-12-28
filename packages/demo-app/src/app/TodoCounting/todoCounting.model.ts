import { utils, api, enums } from 'demo-common';
import { Action } from 'redux-actions';
import { EffectsCommandMap } from 'dva';
import wrappedTodoCountingActions from './todoCounting.action';

const { unwrapActions } = utils;

const todoCountingActions = unwrapActions(wrappedTodoCountingActions);

export interface Counting {
  todoType: enums.TodoType;
  todoTypeName: enums.TodoTypeName;
  count: number;
}

export type Countings = Array<Counting>;

const defalutState: Countings = [];

export default {
  namespace: 'todoCounting',
  state: defalutState,
  reducers: {
    set(state: Countings, { payload }: Action<any>) {
      return payload;
    },
  },
  effects: {
    *fetch({ payload }: Action<any>, { call, put }: EffectsCommandMap) {
      // 获取待办任务数量(包含可撤回)
      const { data: counts } = yield call(api.workflowDemo.me_todo_list_stats_get);
      yield put(todoCountingActions.set(counts));
    },
  },
};
