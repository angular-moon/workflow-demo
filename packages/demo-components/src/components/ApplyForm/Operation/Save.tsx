import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { utils } from 'demo-common';
import { ActionCreatorsMapObject } from 'redux';
import applyActions from '../../../models/apply/apply.action';

const { bindActions } = utils;

interface OwnProps {
  mode: 'create' | 'update_agent';
}

interface DispatchProps {
  applyBoundActions: ActionCreatorsMapObject;
}

type Props = OwnProps & DispatchProps;

const Save = (props: Props) => {
  function save() {
    const { applyBoundActions, mode } = props;
    applyBoundActions.save({ mode, strict: false });
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
)(Save);
