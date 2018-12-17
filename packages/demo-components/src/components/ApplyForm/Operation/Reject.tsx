import React from 'react';
import { Button } from 'antd';
import { goBack } from 'react-router-redux';
import { connect } from 'react-redux';
import { utils, api } from 'demo-common';
import { ActionCreatorsMapObject } from 'redux';
import applyActions from '../../../actions/apply.action';

const { stateContainer, bindActions } = utils;

stateContainer.injectModel();

interface DispatchProps {
  applyBoundActions: ActionCreatorsMapObject;
}

type Props = DispatchProps;

const Reject = (props: Props) => {
  function save() {
    const { applyBoundActions } = props;
    applyBoundActions.save();
  }

  return (
    <Button type="danger" onClick={save}>
      退回
    </Button>
  );
};

function mapDispatchToProps(dispatch): DispatchProps {
  // @ts-ignore
  return bindActions(applyActions)(dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Reject);
