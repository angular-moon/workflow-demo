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
import TaskForm from '../../TaskForm';
import { HandleSubmitArgs } from '../../TaskForm/TaskForm';
import { Mode } from '../enums/Mode';
import taskModel from '../../../models/task/task.model';

const { stateContainer, bindActions } = utils;

// @ts-ignore
stateContainer.injectModel(taskModel);

interface OwnProps {
  text: string;
  form: WrappedFormUtils;
  mode: Mode;
  type: OperationType;
  selectKey: string;
  opinionStrategy: OpinionStrategy;
  [key: string]: any;
}

interface DispatchProps {
  applyBoundActions: ActionCreatorsMapObject;
  taskBoundActions: ActionCreatorsMapObject;
}

type Props = OwnProps & DispatchProps;

const Submit = (props: Props) => {
  const [taskFormVisible, setTaskFormVisible] = useState(false);

  const { text, form, mode, selectKey, opinionStrategy, type } = props;

  function submit() {
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const { applyBoundActions, taskBoundActions } = props;
        if (selectKey || opinionStrategy !== OpinionStrategy.NONE) {
          setTaskFormVisible(true);
        } else {
          try {
            await applyBoundActions.save(mode);
            await taskBoundActions.submit({});
          } catch (e) {
            utils.popup.error(e.message);
          }
        }
      }
    });
  }

  async function handleTaskFormSubmit({ selectValue, opinion }: HandleSubmitArgs) {
    const { applyBoundActions, taskBoundActions } = props;
    try {
      await applyBoundActions.save(mode);
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

const mapDispatchToProps = bindActions(taskActions, applyActions);

export default connect(
  null,
  mapDispatchToProps
)(Submit);
