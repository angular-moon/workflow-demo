import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { utils, components } from 'demo-common';
import { OperationType } from 'demo-common/src/enums/OperationType.enum';
import { Operation } from 'demo-common/src/types/Operation.d';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject } from 'redux';
import applyActions from '../../models/apply/apply.action';
import applyModel from '../../models/apply/apply.model';
import taskActions from '../../models/task/task.action';
import { Apply } from '../../types/Apply';
import { mapOpComponents } from '../../utils/operations';
import CatalogSelect from './CatalogSelect';
import { Mode } from './enums/Mode';
import opComponentMaps, { Cancel, Save } from './Operation';
import ApplyPrompt from './ApplyPrompt';

const FormItem = Form.Item;
const { stateContainer, bindActions } = utils;
const { ButtonBox } = components;

// @ts-ignore
stateContainer.injectModel(applyModel);

export interface OwnProps {
  /**
   * 申报id
   */
  applyId?: string;
  // 不能使用Mode, 提取props时拿不到枚举值
  /**
   * 模式
   * @workflow
   */
  mode: 'create' | 'update_agent';
  /**
   * 工作流任务id
   */
  taskId: string;
  /**
   * 工作流实例id
   */
  processInstanceId: string;
  /**
   * 工作流配置的操作
   */
  operations: Operation[];
}

interface StateProps {
  /**
   * 申报数据
   */
  apply: Apply;
}

interface DispatchProps {
  applyBoundActions: ActionCreatorsMapObject;
  taskBoundActions: ActionCreatorsMapObject;
}

type Props = StateProps & DispatchProps & OwnProps & FormComponentProps;

type State = {
  opComponents: (React.ReactElement<any> | null)[];
};

export class ApplyForm extends Component<Props, State> {
  state = {
    opComponents: [],
  };

  constructor(props) {
    super(props);
    const { taskId, processInstanceId, taskBoundActions } = this.props;
    // 设置任务数据, 用于保存, 提交, 退回操作
    taskBoundActions.reset();
    taskBoundActions.set({
      taskId,
      processInstanceId,
    });
  }

  componentDidMount() {
    const { form, mode, applyId, applyBoundActions, operations } = this.props;

    applyBoundActions.reset();
    // 加载申请表单数据
    if (applyId) {
      applyBoundActions.fetch(applyId);
    }

    // 提交操作需要的props
    // form: 传递 form utils 用于表单验证
    // mode: 当前的表单模式, 保存业务数据时需要提交给服务器
    const opComponentPropMaps = { [OperationType.SUBMIT]: { form, mode } };

    // 工作流配置的操作, map to opComponent
    const opComponents = operations.map(mapOpComponents(opComponentMaps, opComponentPropMaps));

    this.setState({ opComponents });
  }

  render() {
    const {
      mode,
      apply,
      processInstanceId,
      form: { getFieldDecorator },
    } = this.props;

    const { opComponents } = this.state;

    // mode为create且没有保存过, 取消时删除工作流实例
    const needRemoveWorkFlow = mode === Mode.CREATE && !apply.id;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 5,
        },
      },
    };

    // 采购目录
    const catalogItem =
      mode === Mode.CREATE ? (
        getFieldDecorator('catalog', {
          rules: [
            {
              required: mode === Mode.CREATE,
              message: '请选择采购目录',
            },
          ],
          // @ts-ignore
        })(<CatalogSelect />)
      ) : (
        <div>{apply.catalog.name}</div>
      );

    // 采购预算
    const budgetItem =
      mode === Mode.CREATE ? (
        getFieldDecorator('budget', {
          rules: [
            {
              required: mode === Mode.CREATE,
              message: '请填写采购预算',
            },
          ],
        })(<Input />)
      ) : (
        <div>{apply.budget} 元</div>
      );

    // 采购代理机构
    /* eslint-disable indent */
    const agentItem =
      mode === Mode.UPDATE_AGENT ? (
        <FormItem {...formItemLayout} label="采购代理机构">
          {getFieldDecorator('agent', {
            rules: [
              {
                required: mode === Mode.UPDATE_AGENT,
                message: '请填写代理机构',
              },
            ],
          })(<Input />)}
        </FormItem>
      ) : null;

    return (
      <>
        <Form>
          <FormItem {...formItemLayout} label="采购目录">
            {catalogItem}
          </FormItem>
          <FormItem {...formItemLayout} label="采购预算">
            {budgetItem}
          </FormItem>
          {agentItem}
          <FormItem {...tailFormItemLayout}>
            <ButtonBox>
              {/* workflow op */}
              {opComponents}
              {/* 保存 */}
              <Save mode={mode} />
              {/* 取消 */}
              {<Cancel />}
            </ButtonBox>
          </FormItem>
        </Form>
        {/* 尚未保存的新建阻止切换路由, 如果用户执意退出, 删除新建的工作流 */}
        <ApplyPrompt when={needRemoveWorkFlow} processInstanceId={processInstanceId} />
      </>
    );
  }
}

function createFormField(value) {
  return Form.createFormField({
    value,
  });
}

const WrappedApplyForm = Form.create({
  // map redux store
  mapPropsToFields(props: Props) {
    return {
      catalog: createFormField(props.apply.catalog),
      budget: createFormField(props.apply.budget),
      agent: createFormField(props.apply.agent),
    };
  },
  // set redux store
  onValuesChange(props, changedValues, allValues) {
    const { applyBoundActions } = props;
    applyBoundActions.set(changedValues);
  },
})(ApplyForm);

function mapStateToProps({ apply }: any): StateProps {
  return { apply };
}

function mapDispatchToProps(dispatch): DispatchProps {
  // @ts-ignore
  return bindActions(applyActions, taskActions)(dispatch);
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(WrappedApplyForm);
