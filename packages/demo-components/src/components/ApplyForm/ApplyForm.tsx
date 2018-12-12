import { Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { utils } from 'demo-common';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject, Dispatch } from 'redux';
import applyActions from '../../actions/apply.action';
import applyModel from '../../models/apply.model';
import CatalogSelect, { Catalog } from './CatalogSelect';

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
}

interface StateProps {
  /**
   * 申报数据
   */
  apply: {
    catalog: Catalog;
    budget: number;
    agent: string;
  };
}

interface DispatchProps {
  applyBoundActions: ActionCreatorsMapObject;
}

type Props = StateProps & DispatchProps & OwnProps & FormComponentProps;

export class ApplyForm extends Component<Props> {
  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  componentDidMount() {
    const { id, applyBoundActions } = this.props;
    applyBoundActions.reset();
    if (id) {
      applyBoundActions.fetch(id);
    }
  }

  render() {
    const {
      mode,
      apply,
      form: { getFieldDecorator },
    } = this.props;

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
          <Button type="primary" htmlType="submit">
            提交
          </Button>
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

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
  // @ts-ignore
  return bindActions(applyActions);
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(WrappedApplyForm);
