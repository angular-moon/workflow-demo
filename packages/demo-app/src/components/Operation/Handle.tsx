import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { utils } from 'demo-common';
import { ActionCreatorsMapObject } from 'redux';
import { TodoType } from 'demo-common/src/enums';
import { workflowUIModel, workflowUIActions } from '../../models/workflowUI';

const { stateContainer, bindActions } = utils;

stateContainer.injectModel(workflowUIModel);

type OwnProps = {
  applyId?: string;
  taskId: string;
  processInstanceId: string;
  todoType: TodoType;
};

interface DispatchProps {
  workflowUIBoundActions: ActionCreatorsMapObject;
}

type Props = DispatchProps & OwnProps;

const Handle = (props: Props) => {
  function handle() {
    const { applyId, taskId, processInstanceId, todoType, workflowUIBoundActions } = props;
    workflowUIBoundActions.showUI({
      applyId,
      taskId,
      processInstanceId,
      todoType,
    });
  }

  return (
    <Button type="primary" onClick={handle}>
      处理
    </Button>
  );
};

function mapDispatchToProps(dispatch): DispatchProps {
  // @ts-ignore
  return bindActions(workflowUIActions)(dispatch);
}

export default connect<any, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(Handle);
