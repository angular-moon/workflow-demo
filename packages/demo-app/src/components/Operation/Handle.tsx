import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { utils } from 'demo-common';
// @ts-ignore
import { Dispatch, ActionCreatorsMapObject } from 'redux';
import { workflowUIModel, workflowUIActions } from '../../models/workflowUI';
import { TodoType } from 'demo-common/src/enums';

const { stateContainer, bindActions } = utils;

stateContainer.injectModel(workflowUIModel);

type OwnerProps = {
  taskId: string;
  todoType: TodoType;
  processId: string;
  applyId?: string;
};

interface DispatchProps {
  workflowUIBoundActions: ActionCreatorsMapObject;
}

type Props = OwnerProps & DispatchProps;

const Handle = (props: Props) => {
  function handle() {
    const { taskId, processId, applyId, workflowUIBoundActions } = props;
    workflowUIBoundActions.showUI({ taskId, processId, applyId });
  }

  return (
    <Button type="primary" onClick={handle}>
      处理
    </Button>
  );
};

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
  // @ts-ignore
  return bindActions(workflowUIActions)(dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Handle);
