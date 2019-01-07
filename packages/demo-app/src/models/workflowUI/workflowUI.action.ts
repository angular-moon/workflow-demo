import { createActions } from 'redux-actions';
// @ts-ignore
import { identity } from 'ramda';
import UIUrlMap from './UIUrlMap';
import { UIConfigRaw, TaskCoreData, UIConfig } from '../../types/WorkflowUIProps.d';

interface SetI {
  (UIConfigRaw: UIConfigRaw, tcd: TaskCoreData): UIConfig;
}

const set: SetI = (UICofing, { taskId, processInstanceId, applyId }) => ({
  url: UIUrlMap[UICofing.name],
  data: JSON.parse(UICofing.data || '{}'),
  operations: UICofing.operations.map(operation => ({
    ...operation,
    data: JSON.parse(operation.data || '{}'),
  })),
  taskId,
  processInstanceId,
  applyId,
});

export default createActions({
  workflowUI: {
    reset: identity,
    set,
    showUI: identity,
    createProcess: identity,
  },
});
