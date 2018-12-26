import { Button } from 'antd';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { utils } from 'demo-common';
import { OperationType } from 'demo-common/src/enums/OperationType.enum';
import { OpinionStrategy } from 'demo-common/src/types/Operation';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject } from 'redux';
import applyActions from '../../../models/apply/apply.action';
import taskActions from '../../../models/task/task.action';
import TaskForm, { HandleSubmitArgs } from '../../TaskForm';
import { Mode } from '../enums/Mode';

const { bindActions } = utils;

interface OwnProps {
  text: string;
  form: WrappedFormUtils;
  mode: Mode;
  type: OperationType;
  selectKey: string;
  opinion: OpinionStrategy;
  [key: string]: any;
}

interface DispatchProps {
  applyBoundActions: ActionCreatorsMapObject;
  taskBoundActions: ActionCreatorsMapObject;
}

type Props = OwnProps & DispatchProps;

const Submit = (props: Props) => {
  const [taskFormVisible, setTaskFormVisible] = useState(false);

  const { text, form, mode, selectKey, opinion, type } = props;

  function submit() {
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const { taskBoundActions } = props;
        if (selectKey && opinion === OpinionStrategy.NONE) {
          setTaskFormVisible(true);
        } else {
          try {
            await applyActions.save(mode);
            await taskBoundActions.submit();
          } catch (e) {
            utils.popup.error(e.message);
          }
        }
      }
    });
  }

  async function handleTaskFormSubmit({ selectKey, selectValue, opinion }: HandleSubmitArgs) {
    const { mode, taskBoundActions } = props;
    try {
      await applyActions.save(mode);
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
        selectKey={selectKey}
        visible={taskFormVisible}
        handleSubmit={handleTaskFormSubmit}
        handleCancel={handleTaskFormCancel}
      />
    </>
  );
};

const mapDispatchToProps = bindActions(taskActions, applyActions);

export default connect(
  null,
  mapDispatchToProps
)(Submit);
