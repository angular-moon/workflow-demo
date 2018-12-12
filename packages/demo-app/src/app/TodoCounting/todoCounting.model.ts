import { utils, api } from 'demo-common';
import { Action } from 'redux-actions';
import { EffectsCommandMap } from 'dva';
import wrappedTodoCountingActions from './todoCounting.action';

const { unwrapActions } = utils;

const todoCountingActions = unwrapActions(wrappedTodoCountingActions);

export interface Counting {
  name: string;
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
        const [{ data: transientCount }, { data: otherCount }] = yield [
          call(api.workflowDemo.me_transient_applications_counting_get),
          call(api.workflowDemo.me_todo_list_counting_get),
        ];
        yield put(todoCountingActions.set(transientCount, otherCount));
      } catch (e) {
        console.log(e);
      }
    },
  },
};
