import { Col, Row } from 'antd';
import { utils, components } from 'demo-common';
import React, { useEffect } from 'react';
import { Operation } from 'demo-common/src/types/Operation.d';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject } from 'redux';
import styled from 'styled-components';
import applyActions from '../../models/apply/apply.action';
import applyModel from '../../models/apply/apply.model';
import opComponentMaps, { Cancel } from './Operation';
import { mapOpComponents } from '../../utils/operations';
import taskActions from '../../models/task/task.action';

const { stateContainer, bindActions } = utils;
const { ButtonBox } = components;

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
   * 工作流任务id
   */
  taskId: string;
  /**
   * 工作流实例id
   */
  processInstanceId: string;
  /**
   * 工作流配置的操作
   */
  operations: Array<Operation>;
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

const Item = styled.div`
  padding: 15px;
  label {
    display: block;
    color: #6b7f92;
  }
`;

export const ApplyView = (props: Props) => {
  const {
    applyId,
    apply,
    taskId,
    processInstanceId,
    applyBoundActions,
    taskBoundActions,
    operations,
  } = props;

  useEffect(() => {
    applyBoundActions.fetch(applyId);

    // 设置任务数据, 用于保存, 提交, 退回操作
    taskBoundActions.reset();
    taskBoundActions.set({
      taskId,
      processInstanceId,
    });
  }, []);

  // 工作流配置的操作, map to opComponent
  const opComponents = operations.map(mapOpComponents(opComponentMaps));

  return apply ? (
    <Row gutter={16}>
      <Col span={24}>
        <Item>
          <label>采购目录</label>
          <div>{apply.catalog.name}</div>
        </Item>
      </Col>
      <Col span={24}>
        <Item>
          <label>采购金额</label>
          <div>{apply.budget} 元</div>
        </Item>
      </Col>
      <Col span={24}>
        <Item>
          <label>采购代理机构</label>
          <div>{apply.agent}</div>
        </Item>
      </Col>
      <Col span={24}>
        <Item>
          <ButtonBox>
            {/* workflow op */}
            {opComponents}
            {/* 取消 */}
            <Cancel />
          </ButtonBox>
        </Item>
      </Col>
    </Row>
  ) : null;
};

function mapStateToProps({ apply }: any): StateProps {
  return { apply };
}

function mapDispatchToProps(dispatch): DispatchProps {
  // @ts-ignore
  return bindActions(applyActions, taskActions)(dispatch);
}

/**
 * @workflow
 */
export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ApplyView);
