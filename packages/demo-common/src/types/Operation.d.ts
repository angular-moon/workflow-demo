import { OperationType } from '../enums/OperationType.enum';

export enum Opinion {
  NONE = 'NONE',
  REQUIRE = 'REQUIRE',
  OPTIONAL = 'OPTIONAL',
}

export type Operation = {
  name: string;
  type: OperationType;
  opinion: Opinion;
  // 是否需要选择提交节点
  select?: string;
  data?: {};
};
