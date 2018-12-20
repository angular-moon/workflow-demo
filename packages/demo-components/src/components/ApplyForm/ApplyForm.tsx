import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { utils } from 'demo-common';
import { OperationType } from 'demo-common/src/enums/OperationType.enum';
import { TodoType } from 'demo-common/src/enums/TodoType.enum';
import { Operation } from 'demo-common/src/types/Operation';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject } from 'redux';
import applyActions from '../../models/apply/apply.action';
import applyModel from '../../models/apply/apply.model';
import { filterOperations, mapOpComponents } from '../../utils/operations';
import ButtonBox from '../ButtonBox';
import { Cancel } from '../Operation';
import CatalogSelect, { Catalog } from './CatalogSelect';
import opComponentMaps, { Save } from './Operation';
import { Apply } from '../../types/Apply';

const FormItem = Form.Item;
const { stateContainer, bindActions } = utils;

// @ts-ignore
stateContainer.injectModel(applyModel);

export enum Mode {
  CREATE = 'create',
  UPDATE_AGENT = 'update_agent',
}

export interface OwnProps {
  /**
   * 申报id
   */
  id?: string;
  /**
   * 模式
   * @workflow
   */
  mode: 'create' | 'update_agent';
  /**
   * 工作流任务类型
   */
  todoType: TodoType;
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
}

type Props = StateProps & DispatchProps & OwnProps & FormComponentProps;

type State = {
  opComponents: (React.ReactElement<any> | null)[];
};

export class ApplyForm extends Component<Props, State> {
  state = {
    opComponents: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  removeWorkFlow = () => {
    // TODO
    console.log('workFlow was removed');
    // @ts-ignore
    return Promise.resolve('workFlow was removed');
  };

  componentDidMount() {
    const { form, id, applyBoundActions, todoType, operations } = this.props;
    applyBoundActions.reset();
    if (id) {
      applyBoundActions.fetch(id);
    }

    const opComponents = filterOperations(todoType)(operations).map(
      mapOpComponents(opComponentMaps, { [OperationType.SUBMIT]: { form } })
    );

    this.setState({ opComponents });
  }

  render() {
    const {
      mode,
      apply,
      form: { getFieldDecorator },
    } = this.props;

    const { opComponents } = this.state;

    // mode为create且没有保存过, 取消时删除工作流
    const cancelNeedRemoveWorkFlow = mode === Mode.CREATE && !apply.id;

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
          {getFieldDecorator('budget', {
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
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="采购目录">
          {catalogItem}
        </FormItem>
        <FormItem {...formItemLayout} label="采购预算">
          {budgetItem}
        </FormItem>
        {agentItem}
        <FormItem {...tailFormItemLayout}>
          <ButtonBox>
            {opComponents}
            <Save />
            {/* 取消 */}
            {cancelNeedRemoveWorkFlow ? <Cancel preCancel={this.removeWorkFlow} /> : <Cancel />}
          </ButtonBox>
        </FormItem>
      </Form>
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
  return bindActions(applyActions)(dispatch);
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(WrappedApplyForm);
