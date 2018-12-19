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
      try {
        // 获取暂存和待办任务数量
        const { data: todoCounting } = yield call(api.workflowDemo.me_todo_list_stats_get);
        yield put(todoCountingActions.set(todoCounting));
      } catch (e) {
        console.log(e);
      }
    },
  },
};
