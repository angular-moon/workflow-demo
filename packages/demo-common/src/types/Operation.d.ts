import { OperationType } from '../enums/OperationType.enum';

export enum OpinionStrategy {
  NONE = 'NONE',
  REQUIRE = 'REQUIRE',
  OPTIONAL = 'OPTIONAL',
}

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
