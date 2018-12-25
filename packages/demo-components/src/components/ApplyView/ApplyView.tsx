import { Col, Row } from 'antd';
import { utils } from 'demo-common';
import React, { useEffect } from 'react';
import { TodoType } from 'demo-common/src/enums/TodoType.enum';
import { Operation } from 'demo-common/src/types/Operation';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject } from 'redux';
import styled from 'styled-components';
import applyActions from '../../models/apply/apply.action';
import applyModel from '../../models/apply/apply.model';
import opComponentMaps, { Cancel } from './Operation';
import { filterOperations, mapOpComponents } from '../../utils/operations';
import taskActions from '../../models/task/task.action';

const { stateContainer, bindActions } = utils;

// @ts-ignore
stateContainer.injectModel(applyModel);

type Catalog = {
  id: string;
  name: string;
};

export interface OwnProps {
  /**
   * 申报id
   */
  applyId?: string;
  /**
   * 工作流任务类型
   */
  todoType: TodoType;
  /**
   * 工作流任务id
   */
  taskId: string;
  /**
   * 工作流实例id
   */
  processId: string;
  /**
   * 工作流配置的操作
   */
  operations: Operation[];
}

interface StateProps {
  /**
   * 申报数据
   */
  apply: {
    catalog: Catalog;
    budget: number;
    agent: string;
  };
}

interface DispatchProps {
  applyBoundActions: ActionCreatorsMapObject;
  taskBoundActions: ActionCreatorsMapObject;
}

type Props = StateProps & DispatchProps & OwnProps;

const Label = styled.label`
  display: block;
`;

export const ApplyView = (props: Props) => {
  const {
    applyId,
    apply,
    taskId,
    processId,
    applyBoundActions,
    taskBoundActions,
    todoType,
    operations,
  } = props;
  useEffect(() => {
    applyBoundActions.fetch(applyId);

    // 设置任务数据, 用于保存, 提交, 退回操作
    taskBoundActions.reset();
    taskBoundActions.set({
      taskId,
      processId,
    });
  }, []);

  // 计算当前任务有哪些操作, 工作流配置有且当前的任务类型允许出现该操作
  const opComponents = filterOperations(todoType)(operations).map(mapOpComponents(opComponentMaps));

  return (
    <Row gutter={16}>
      <Col span={24}>
        <Label>采购目录</Label>
        <div>{apply.catalog.name}</div>
      </Col>
      <Col span={24}>
        <Label>采购金额</Label>
        <div>{apply.budget} 元</div>
      </Col>
      <Col span={24}>
        <Label>采购代理机构</Label>
        <div>{apply.agent}</div>
      </Col>
      <Col span={24}>
        {/* workflow op */}
        {opComponents}
        {/* 取消 */}
        <Cancel />
      </Col>
    </Row>
  );
};

function mapStateToProps({ apply }: any): StateProps {
  return { apply };
}

function mapDispatchToProps(dispatch): DispatchProps {
  // @ts-ignore
  return bindActions(applyActions, taskActions)(dispatch);
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ApplyView);
