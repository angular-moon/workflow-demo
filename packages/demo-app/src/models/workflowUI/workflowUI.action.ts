import { createActions } from 'redux-actions';
// @ts-ignore
import { identity } from 'ramda';

import UIUrlMap from './UIUrlMap';

export default createActions({
  workflowUI: {
    reset: identity,
    set: UICofing => ({
      url: UIUrlMap[UICofing.name],
      props: JSON.parse(UICofing.data),
      operations: UICofing.operations.map(({ name, data, opinion }) => ({
        name,
        props: JSON.parse(data),
        opinion,
      })),
    }),
    showUI: identity,
    createWorkflow: identity,
  },
});
