import { Button } from 'antd';
import { utils } from 'demo-common';
import { OperationType } from 'demo-common/src/enums/OperationType.enum';
import { OpinionStrategy } from 'demo-common/src/types/Operation';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject } from 'redux';
import taskActions from '../../models/task/task.action';
import TaskForm, { HandleSubmitArgs } from '../TaskForm';

const { bindActions } = utils;

interface OwnProps {
  text: string;
  type: OperationType;
  select: string; // selectKey
  opinion: OpinionStrategy;
  [key: string]: any;
}

interface DispatchProps {
  taskBoundActions: ActionCreatorsMapObject;
}

type Props = OwnProps & DispatchProps;

const Submit = (props: Props) => {
  const [taskFormVisible, setTaskFormVisible] = useState(false);

  const { text, taskBoundActions, select, opinion, type } = props;

  async function submit() {
    if (select && opinion === OpinionStrategy.NONE) {
      setTaskFormVisible(true);
    } else {
      try {
        await taskBoundActions.submit();
      } catch (e) {
        utils.popup.error(e.message);
      }
    }
  }

  async function handleTaskFormSubmit({ selectKey, selectValue, opinion }: HandleSubmitArgs) {
    const { taskBoundActions } = props;
    try {
      await taskBoundActions.submit({ selectKey, selectValue, opinion });
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
      <Button type="primary" onClick={submit}>
        {text}
      </Button>
      <TaskForm
        operationType={type}
        opinionStrategy={opinion}
        selectKey={select}
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
)(Submit);
