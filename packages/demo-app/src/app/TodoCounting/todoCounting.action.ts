import { createActions } from 'redux-actions';
// @ts-ignore
import { identity } from 'ramda';
import { enums } from 'demo-common';

export default createActions({
  todoCounting: {
    fetch: identity,
    set: counts =>
      counts.map(count => ({
        todoType: count.type,
        todoTypeName: enums.TodoTypeName[count.type],
        count: count.num,
      })),
  },
});
