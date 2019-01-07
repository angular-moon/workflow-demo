import { Button } from 'antd';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { utils } from 'demo-common';
import { OperationType } from 'demo-common/src/enums/OperationType.enum';
import { OpinionStrategy } from 'demo-common/src/types/Operation.d';
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

        // 保存业务数据, 需要在请求加载选择节点之前保存业务数据
        // 因为可选择的提交节点和业务数据有关
        try {
          await applyBoundActions.save({ mode, strict: true });
        } catch (e) {
          utils.popup.error(e.message);
        }

        // 如果需要选择提交节点或者填写意见, show TaskForm as Modal
        // 否则任务直接提交到下一个节点
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
    });
  }

  async function handleTaskFormSubmit({ selectValue, opinion }: HandleSubmitArgs) {
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
