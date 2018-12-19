import { utils, api } from 'demo-common';
import { Action } from 'redux-actions';
import { EffectsCommandMap } from 'dva';
import { assign } from 'lodash';
import produce from 'immer';
import wrappedTodoListActions from './todoList.action';
import Pagination from '../../types/Pagination';

const { unwrapActions } = utils;

const todoListActions = unwrapActions(wrappedTodoListActions);

const defaultState = () => assign(
  {},
  {
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    } as Pagination,
    todos: [],
  }
);

export default {
  namespace: 'todoList',
  state: defaultState(),
  reducers: {
    reset(state, action) {
      return defaultState();
    },
    setPagination(state, { payload: pagination }: Action<any>) {
      /* eslint-disable no-param-reassign */
      return produce(state, draft => {
        draft.pagination = { ...state.pagination, ...pagination };
      });
    },
    setTodos(state, { payload: todos }: Action<any>) {
      /* eslint-disable no-param-reassign */
      return produce(state, draft => {
        draft.todos = todos;
      });
    },
  },
  effects: {
    *fetch({ payload: bizState }: Action<any>, {
      call, put, select, all,
    }: EffectsCommandMap) {
      try {
        const pagination: Pagination = yield select(state => state.todoList.pagination);
        const [
          { data: todos },
          {
            data: { value: total },
          },
        ] = yield all([
          call(api.workflowDemo.me_todo_list_get, {
            params: {
              bizState,
              offset: (pagination.current - 1) * pagination.pageSize,
              limit: pagination.pageSize,
            },
          }),
          call(api.workflowDemo.me_todo_list_counting_get),
        ]);
        yield put(todoListActions.setTodos(todos));
        yield put(todoListActions.setPagination({ total }));
      } catch (e) {
        console.log(e);
      }
    },
  },
};
