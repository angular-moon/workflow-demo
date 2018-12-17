import React from 'react';
import { Button } from 'antd';
import { goBack } from 'react-router-redux';
import { connect } from 'react-redux';
import { utils } from 'demo-common';
import { ActionCreatorsMapObject } from 'redux';
import applyActions from '../../../actions/apply.action';

const { bindActions } = utils;

interface DispatchProps {
  applyBoundActions: ActionCreatorsMapObject;
}

type Props = DispatchProps;

const Cancel = (props: Props) => {
  function save() {
    const { applyBoundActions } = props;
    applyBoundActions.save();
  }

  return (
    <Button type="default" onClick={save}>
      保存
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
)(Cancel);
