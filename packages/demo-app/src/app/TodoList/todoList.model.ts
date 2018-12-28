import { api, utils } from 'demo-common';
import { TodoType } from 'demo-common/src/enums';
import { EffectsCommandMap } from 'dva';
import produce from 'immer';
import { assign } from 'lodash';
import { Action } from 'redux-actions';
import Pagination from '../../types/Pagination';
import wrappedTodoListActions from './todoList.action';

const { unwrapActions } = utils;

const todoListActions = unwrapActions(wrappedTodoListActions);

const defaultState = () =>
  assign(
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
    *fetch({ payload: todoType }: Action<any>, { call, put, select, all }: EffectsCommandMap) {
      const pagination: Pagination = yield select(state => state.todoList.pagination);
      const todoApi =
        todoType === TodoType.REVOKABLE
          ? api.workflowDemo.me_revoke_tasks_get
          : api.workflowDemo.me_todo_list_get;

      const todoCountApi =
        todoType === TodoType.REVOKABLE
          ? api.workflowDemo.me_revoke_tasks_counting_get
          : api.workflowDemo.me_todo_list_counting_get;

      const [
        { data: todos },
        {
          data: { value: total },
        },
      ] = yield all([
        call(todoApi, {
          params: {
            taskType: todoType,
            offset: (pagination.current - 1) * pagination.pageSize,
            limit: pagination.pageSize,
          },
        }),
        call(todoCountApi),
      ]);
      yield put(todoListActions.setTodos(todos));
      yield put(todoListActions.setPagination({ total }));
    },
  },
};
