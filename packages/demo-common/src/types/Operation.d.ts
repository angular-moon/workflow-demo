import { OperationType, OpinionStrategy } from '../enums';

export interface OperationRaw {
  name: string;
  type: OperationType;
  opinionStrategy: OpinionStrategy;
  // 是否需要选择提交节点
  selectKey?: string;
  data?: string;
}

export interface Operation extends OperationRaw {
  data?: {};
}
