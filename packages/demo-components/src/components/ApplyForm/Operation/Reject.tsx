import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { utils, api } from 'demo-common';
import { ActionCreatorsMapObject } from 'redux';
import applyActions from '../../../models/apply/apply.action';

const { bindActions } = utils;

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
