import { Operation } from 'demo-common/src/types/Operation';

export type WorkflowUI = {
  url: string | null;
  props?: {};
  operations: Operation[];
};
