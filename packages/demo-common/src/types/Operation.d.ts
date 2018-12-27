import { OperationType } from '../enums/OperationType.enum';

export enum OpinionStrategy {
  NONE = 'NONE',
  REQUIRE = 'REQUIRE',
  OPTIONAL = 'OPTIONAL',
}

export type Operation = {
  name: string;
  type: OperationType;
  opinionStrategy: OpinionStrategy;
  // 是否需要选择提交节点
  selectKey?: string;
  data?: {};
};
