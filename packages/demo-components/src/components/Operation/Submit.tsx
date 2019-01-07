import { Button } from 'antd';
import { utils } from 'demo-common';
import { OperationType } from 'demo-common/src/enums/OperationType.enum';
import { OpinionStrategy } from 'demo-common/src/types/Operation.d';
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
  selectKey: string;
  opinionStrategy: OpinionStrategy;
  [key: string]: any;
}

interface DispatchProps {
  taskBoundActions: ActionCreatorsMapObject;
}

type Props = OwnProps & DispatchProps;

const Submit = (props: Props) => {
  const [taskFormVisible, setTaskFormVisible] = useState(false);

  const { text, taskBoundActions, selectKey, opinionStrategy, type } = props;

  async function submit() {
    if (selectKey || opinionStrategy !== OpinionStrategy.NONE) {
      setTaskFormVisible(true);
    } else {
      try {
        await taskBoundActions.submit({});
      } catch (e) {
        utils.popup.error(e.message);
      }
    }
  }

  async function handleTaskFormSubmit({ selectValue, opinion }: HandleSubmitArgs) {
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
        opinionStrategy={opinionStrategy}
        selectKey={selectKey}
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
