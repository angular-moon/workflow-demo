import { createActions } from 'redux-actions';
// @ts-ignore
import { identity } from 'ramda';

export default createActions({
  todoCounting: {
    fetch: identity,
    set: (transientCount, otherTodo) => [
      // {
      //   bizState: 'transient',
      //   name: '暂存',
      //   count: 10,
      // },
      {
        bizState: 'pending',
        name: '待处理',
        count: 8,
      },
      {
        bizState: 'rejected',
        name: '被退回',
        count: 8,
      },
      {
        bizState: 'revokeable',
        name: '可撤销',
        count: 0,
      },
    ],
    // }][
    //   {
    //     bizState: 'transient',
    //     name: '暂存',
    //     count: transientCount,
    //   },
    //   ...otherTodo,
    // ],
  },
});
