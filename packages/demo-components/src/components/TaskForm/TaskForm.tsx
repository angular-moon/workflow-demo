import React, { Component, MouseEvent } from 'react';
import { Form, Select, Input, Modal } from 'antd';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject } from 'redux';
import { FormComponentProps } from 'antd/lib/form';
import { OpinionStrategy } from 'demo-common/src/types/Operation';
import { OperationType } from 'demo-common/src/enums/OperationType.enum';
import { utils } from 'demo-common';
import taskModel, { SelectNode } from '../../models/task/task.model';
import taskActions from '../../models/task/task.action';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const { stateContainer, bindActions } = utils;
// @ts-ignore
stateContainer.injectModel(taskModel);

export interface HandleSubmitArgs {
  selectValue?: string;
  opinion?: string;
}

interface OwnProps {
  operationType: OperationType;
  selectKey?: string; // submit 时可选的
  opinionStrategy: OpinionStrategy;
  handleSubmit: (args: HandleSubmitArgs) => void;
  handleCancel: (e: MouseEvent<any>) => void;
  visible: boolean;
}

interface StateProps {
  /**
   * 选择流程节点(submit or reject)
   */
  selectNodes: Array<SelectNode>;
}

interface DispatchProps {
  applyBoundActions: ActionCreatorsMapObject;
  taskBoundActions: ActionCreatorsMapObject;
}

type Props = OwnProps & StateProps & DispatchProps & FormComponentProps;

class TaskForm extends Component<Props> {
  handleOk = () => {
    const { form, handleSubmit } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        const { selectValue, opinion } = fieldsValue;
        handleSubmit({ selectValue, opinion });
      }
    });
  };

  componentDidMount() {
    const { operationType, selectKey, taskBoundActions } = this.props;
    if (
      (operationType === OperationType.SUBMIT && selectKey) ||
      operationType === OperationType.REJECT
    ) {
      taskBoundActions.fetchSelectNodes(operationType);
    }
  }

  render() {
    const { selectNodes, operationType, opinionStrategy, form, handleCancel, visible } = this.props;
    const selectLabel = operationType === OperationType.SUBMIT ? '提交给:' : '退回到:';
    const opinionLabel = operationType === OperationType.SUBMIT ? '审核意见:' : '退回原因:';

    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    const selectFormItem = selectNodes ? (
      <FormItem {...formItemLayout} label={selectLabel}>
        {getFieldDecorator('selectValue', {
          rules: [
            {
              required: true,
              message: '请选择',
            },
          ],
        })(
          <Select>
            {selectNodes.map(node => (
              <Option value={node.id} key={node.id}>
                {node.name}
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
    ) : null;

    const opinionFormItem =
      opinionStrategy !== OpinionStrategy.NONE ? (
        <FormItem {...formItemLayout} label={opinionLabel}>
          {getFieldDecorator('opinion', {
            rules: [
              {
                required: opinionStrategy === OpinionStrategy.REQUIRE,
                message: '请填写',
              },
            ],
          })(<TextArea rows={4} />)}
        </FormItem>
      ) : null;

    return (
      <Modal title="请填写以下信息" visible={visible} onOk={this.handleOk} onCancel={handleCancel}>
        <Form>
          {selectFormItem}
          {opinionFormItem}
        </Form>
      </Modal>
    );
  }
}

const WrappedTaskForm = Form.create()(TaskForm);

function mapStateToProps(state): StateProps {
  return {
    selectNodes: state.task.selectNodes,
  };
}

function mapDispatchToProps(dispatch): DispatchProps {
  // @ts-ignore
  return bindActions(taskActions)(dispatch);
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(WrappedTaskForm);
