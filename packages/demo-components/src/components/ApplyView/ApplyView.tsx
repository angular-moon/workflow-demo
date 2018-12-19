import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { Dispatch, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { utils } from 'demo-common';
import applyModel from '../../models/apply/apply.model';
import applyActions from '../../models/apply/apply.action';

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
  id: string;
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
}

type Props = StateProps & DispatchProps & OwnProps;

export const ApplyView = (props: Props) => {
  const { id, apply, applyBoundActions } = props;
  useEffect(() => {
    applyBoundActions.fetch(id);
  }, []);

  return (
    <Row gutter={16}>
      <Col className="gutter-row" span={8}>
        <label>采购目录</label>
        <div className="gutter-box">{apply.catalog.name}</div>
      </Col>
      <Col className="gutter-row" span={8}>
        <label>采购金额</label>
        <div className="gutter-box">{apply.budget} 元</div>
      </Col>
      <Col className="gutter-row" span={8}>
        <label>采购代理机构</label>
        <div className="gutter-box">{apply.agent}</div>
      </Col>
    </Row>
  );
};

function mapStateToProps({ apply }: any): StateProps {
  return { apply };
}

function mapDispatchToProps(dispatch): DispatchProps {
  // @ts-ignore
  return bindActions(applyActions)(dispatch);
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ApplyView);
