import { createActions } from 'redux-actions';
// @ts-ignore
import { identity } from 'ramda';

import UIUrlMap from './UIUrlMap';

export default createActions({
  workflowUI: {
    reset: identity,
    set: (UICofing, { taskId, processId, applyId, todoType }) => ({
      url: UIUrlMap[UICofing.name],
      data: JSON.parse(UICofing.data),
      operations: UICofing.operations.map(operation => ({
        ...operation,
        data: JSON.parse(operation.data),
      })),
      taskId,
      processId,
      applyId,
      todoType,
    }),
    showUI: identity,
    createWorkflow: identity,
  },
});
