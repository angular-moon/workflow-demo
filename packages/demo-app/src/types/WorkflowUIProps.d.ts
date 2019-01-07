import { Operation, OperationRaw } from 'demo-common/src/types/Operation.d';

export interface UIConfigRaw {
  name: string;
  data?: strting;
  operations: OperationRaw[];
}

export interface UIConfig {
  url: string;
  data?: {};
  operations: Operation[];
}

export interface TaskCoreData {
  taskId: string;
  processInstanceId: string;
  applyId?: string;
}

export type WorkflowUIProps = UIConfig & TaskCoreData;
