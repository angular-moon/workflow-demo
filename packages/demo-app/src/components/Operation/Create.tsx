import React, { useState } from 'react';
import { connect } from 'react-redux';
import { utils } from 'demo-common';
// @ts-ignore
import { Dispatch, ActionCreatorsMapObject } from 'redux';
import { workflowUIModel, workflowUIActions } from '../../models/workflowUI';

const { stateContainer, bindActions } = utils;

stateContainer.injectModel(workflowUIModel);

interface OwnerProps {
  disabled: boolean;
}

interface DispatchProps {
  workflowUIBoundActions: ActionCreatorsMapObject;
}

type Props = OwnerProps & DispatchProps;

const Create = (props: Props) => {
  const [createdFlag, setCreatedFlag] = useState(false);

  function create() {
    const { workflowUIBoundActions, disabled } = props;
    console.log('create', disabled);
    if (!disabled) workflowUIBoundActions.createWorkflow();
  }

  return (
    <a onClick={create} role="link" tabIndex={0} style={{ display: 'inline-block' }}>
      新建采购申报
    </a>
  );
};

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
  // @ts-ignore
  return bindActions(workflowUIActions)(dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Create);
