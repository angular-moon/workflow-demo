import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { utils } from 'demo-common';
// @ts-ignore
import { Dispatch, ActionCreatorsMapObject } from 'redux';
import todoListActions from '../todoList.action';

const { bindActions } = utils;

type OwnerProps = {
  taskId: string;
  processInstanceId: string;
};

interface DispatchProps {
  todoListBoundActions: ActionCreatorsMapObject;
}

type Props = OwnerProps & DispatchProps;

const Delete = (props: Props) => {
  function del() {
    const { taskId, processInstanceId, todoListBoundActions } = props;
    todoListBoundActions.del({ taskId, processInstanceId });
  }

  return (
    <Button type="danger" onClick={del}>
      删除
    </Button>
  );
};

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
  // @ts-ignore
  return bindActions(todoListActions)(dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Delete);
