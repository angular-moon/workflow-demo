import { createActions } from 'redux-actions';
// @ts-ignore
import { identity } from 'ramda';

export default createActions({
  todoList: {
    reset: identity,
    fetch: identity,
    setTodos: identity,
    setPagination: identity,
    del: identity,
    clientDelTodo: identity,
  },
});
