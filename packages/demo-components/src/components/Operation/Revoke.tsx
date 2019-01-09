import { Button } from 'antd';
import { utils } from 'demo-common';
import { OperationType, OpinionStrategy } from 'demo-common/src/enums';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject } from 'redux';
import taskActions from '../../models/task/task.action';
import TaskForm from '../TaskForm';
import { HandleSubmitArgs } from '../TaskForm/TaskForm';
import taskModel from '../../models/task/task.model';

const { stateContainer, bindActions } = utils;
// @ts-ignore
stateContainer.injectModel(taskModel);

interface OwnProps {
  text: string;
  type: OperationType;
  opinionStrategy: OpinionStrategy;
  [key: string]: any;
}

interface DispatchProps {
  taskBoundActions: ActionCreatorsMapObject;
}

type Props = OwnProps & DispatchProps;

const Revoke = (props: Props) => {
  const [taskFormVisible, setTaskFormVisible] = useState(false);

  const { text, opinionStrategy, type } = props;

  function revoke() {
    const { taskBoundActions } = props;
    if (opinionStrategy !== OpinionStrategy.NONE) {
      setTaskFormVisible(true);
    } else {
      taskBoundActions.revoke({}).catch(e => utils.popup.error(e.message));
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
      <Button type="danger" onClick={revoke}>
        {text}
      </Button>
      <TaskForm
        operationType={type}
        opinionStrategy={opinionStrategy}
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
