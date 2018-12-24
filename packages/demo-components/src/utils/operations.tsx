import React from 'react';
// @ts-ignore
import { filter } from 'ramda';
import { TodoType } from 'demo-common/src/enums/TodoType.enum';
import { OperationType } from 'demo-common/src/enums/OperationType.enum';
import { Operation } from 'demo-common/src/types/Operation';

/**
 * 验证操作类型在指定的任务类型下是否是一个有效的操作类型
 * @param todoType
 */
const validOperation = (todoType: TodoType) => (operation: Operation) => {
  switch (todoType) {
    /**
     * 待处理 => 提交 | 退回
     */
    case TodoType.PENDING:
      return operation.type === OperationType.SUBMIT || operation.type === OperationType.REJECT;
    /**
     * 被退回 => 提交
     */
    case TodoType.REJECTED:
      return operation.type === OperationType.SUBMIT;
    /**
     * 可撤回 => 撤回
     */
    case TodoType.REVOKEABLE:
      return operation.type === OperationType.REVOKE;
    default:
      return false;
  }
};

const filterOperations = (todoType: TodoType) => filter(validOperation(todoType));

interface OperationComponentMaps {
  [type: string]: typeof React.Component;
}

interface OperationComponentProps {
  [type: string]: any;
}

const mapOpComponents = (
  opComponentMaps: OperationComponentMaps,
  opComponentProps: OperationComponentProps = {}
) => (operation: Operation) => {
  const Component = opComponentMaps[operation.type];
  const ComponentProps = opComponentProps[operation.type];

  const restProps = { ...operation.data, ...ComponentProps };
  if (Component) {
    return (
      <Component
        key={operation.type}
        text={operation.name}
        type={operation.type}
        select={operation.select}
        opinion={operation.opinion}
        {...restProps}
      />
    );
  }
  return null;
};

export { filterOperations, mapOpComponents };
