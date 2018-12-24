import { Button } from 'antd';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { utils } from 'demo-common';
import { OperationType } from 'demo-common/src/enums/OperationType.enum';
import { OpinionStrategy } from 'demo-common/src/types/Operation';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject, Dispatch } from 'redux';
import { goBack } from 'react-router-redux';
import taskActions from '../../../models/task/task.action';
import TaskForm from '../../TaskForm';

const { bindActions } = utils;

interface OwnProps {
  text: string;
  form: WrappedFormUtils;
  type: OperationType;
  select: string; // selectKey
  opinion: OpinionStrategy;
  [key: string]: any;
}

interface DispatchProps {
  dispatch: Dispatch<any>;
  taskBoundActions: ActionCreatorsMapObject;
}

type Props = OwnProps & DispatchProps;

const Submit = (props: Props) => {
  const [taskFormVisible, setTaskFormVisible] = useState(false);

  const { text, form, select, opinion, type } = props;

  function submit() {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { taskBoundActions } = props;
        if (select && opinion === OpinionStrategy.NONE) {
          setTaskFormVisible(true);
        } else {
          taskBoundActions.submit();
        }
      }
    });
  }

  async function handleTaskFormSubmit(selectKey?: string, selectValue?: string, opinion?: string) {
    const { taskBoundActions, dispatch } = props;
    await taskBoundActions.submit({ selectKey, selectValue, opinion });
    setTaskFormVisible(false);
    dispatch(goBack());
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
