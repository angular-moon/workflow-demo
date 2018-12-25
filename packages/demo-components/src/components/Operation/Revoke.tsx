import { Button } from 'antd';
import { utils } from 'demo-common';
import { OperationType } from 'demo-common/src/enums/OperationType.enum';
import { OpinionStrategy } from 'demo-common/src/types/Operation';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject } from 'redux';
import taskActions from '../../../models/task/task.action';
import TaskForm, { HandleSubmitArgs } from '../../TaskForm';

const { bindActions } = utils;

interface OwnProps {
  text: string;
  type: OperationType;
  opinion: OpinionStrategy;
  [key: string]: any;
}

interface DispatchProps {
  taskBoundActions: ActionCreatorsMapObject;
}

type Props = OwnProps & DispatchProps;

const Revoke = (props: Props) => {
  const [taskFormVisible, setTaskFormVisible] = useState(false);

  const { text, opinion, type } = props;

  function revoke() {
    const { taskBoundActions } = props;
    if (opinion === OpinionStrategy.NONE) {
      setTaskFormVisible(true);
    } else {
      taskBoundActions.revoke().catch(e => utils.popup.error(e.message));
    }
  }

  async function handleTaskFormSubmit({ opinion }: HandleSubmitArgs) {
    const { taskBoundActions } = props;
    try {
      await taskBoundActions.revoke({ opinion });
      setTaskFormVisible(false);
    } catch (e) {
      utils.popup.error(e.message);
    }
  }

  function handleTaskFormCancel() {
    setTaskFormVisible(false);
  }

  return (
    <>
      <Button type="primary" onClick={revoke}>
        {text}
      </Button>
      <TaskForm
        operationType={type}
        opinionStrategy={opinion}
        visible={taskFormVisible}
        handleSubmit={handleTaskFormSubmit}
        handleCancel={handleTaskFormCancel}
      />
    </>
  );
};

const mapDispatchToProps = bindActions(taskActions);

export default connect(
  null,
  mapDispatchToProps
)(Revoke);
