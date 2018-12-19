import { createActions } from 'redux-actions';
// @ts-ignore
import { identity } from 'ramda';
import { enums } from 'demo-common';

export default createActions({
  todoCounting: {
    fetch: identity,
    set: () => [
      {
        todoType: enums.TodoType.PENDING,
        todoTypeName: enums.TodoTypeName.PENDING,
        count: 8,
      },
      {
        todoType: enums.TodoType.REJECTED,
        todoTypeName: enums.TodoTypeName.REJECTED,
        count: 8,
      },
      {
        todoType: enums.TodoType.REVOKEABLE,
        todoTypeName: enums.TodoTypeName.REVOKEABLE,
        count: 0,
      },
    ],
  },
});
