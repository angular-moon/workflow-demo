import React from 'react';
import { connect } from 'react-redux';
import { utils } from 'demo-common';
// @ts-ignore
import { ActionCreatorsMapObject } from 'redux';
import { workflowUIModel, workflowUIActions } from '../../models/workflowUI';

const { stateContainer, bindActions } = utils;

stateContainer.injectModel(workflowUIModel);

interface OwnProps {
  disabled: boolean;
}

interface DispatchProps {
  workflowUIBoundActions: ActionCreatorsMapObject;
}

type Props = OwnProps & DispatchProps;

const Create = (props: Props) => {
  function create() {
    const { workflowUIBoundActions, disabled } = props;
    if (!disabled) workflowUIBoundActions.createProcess();
  }

  return (
    <a onClick={create} role="link" tabIndex={0} style={{ display: 'inline-block' }}>
      新建采购申报
    </a>
  );
};

function mapDispatchToProps(dispatch): DispatchProps {
  // @ts-ignore
  return bindActions(workflowUIActions)(dispatch);
}

export default connect<any, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(Create);
