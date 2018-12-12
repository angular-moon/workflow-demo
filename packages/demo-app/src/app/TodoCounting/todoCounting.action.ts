import { createActions } from 'redux-actions';
// @ts-ignore
import { identity } from 'ramda';

export default createActions({
  todoCounting: {
    fetch: identity,
    set: (transientCount, otherTodo) => [
      {
        name: '暂存',
        count: 10,
      },
      {
        name: '待审核',
        count: 0,
      },
    ],
    // }][
    //   {
    //     name: 'transient',
    //     count: transientCount,
    //   },
    //   ...otherTodo,
    // ],
  },
});
