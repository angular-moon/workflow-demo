import React, { Component } from 'react';
import { Form, Select, Modal } from 'antd';
import { ActionCreatorsMapObject } from 'redux';
import { FormComponentProps } from 'antd/lib/form';
import { OpinionStrategy } from 'demo-common/src/types/Operation';
import { OperationType } from 'demo-common/src/enums/OperationType.enum';

const FormItem = Form.Item;

interface OwnerProps {
  operationType: OperationType;
  selectKey?: string; // submit 时可选的
  opinionStrategy: OpinionStrategy;
}


interface DispatchProps {
  applyBoundActions: ActionCreatorsMapObject;
  taskBoundActions: ActionCreatorsMapObject;
}

type Props = OwnerProps & FormComponentProps;

class TaskForm extends Component<Props> {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
      }
    });
  };

  componentDidMount(){
    if(operationType)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: 'Please select time!' }],
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="DatePicker">
          {getFieldDecorator('date-picker', config)(<DatePicker />)}
        </FormItem>
        <FormItem {...formItemLayout} label="DatePicker[showTime]">
          {getFieldDecorator('date-time-picker', config)(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="MonthPicker">
          {getFieldDecorator('month-picker', config)(<MonthPicker />)}
        </FormItem>
        <FormItem {...formItemLayout} label="RangePicker">
          {getFieldDecorator('range-picker', rangeConfig)(<RangePicker />)}
        </FormItem>
        <FormItem {...formItemLayout} label="RangePicker[showTime]">
          {getFieldDecorator('range-time-picker', rangeConfig)(
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="TimePicker">
          {getFieldDecorator('time-picker', config)(<TimePicker />)}
        </FormItem>
      </Form>
    );
  }
}

const WrappedTimeRelatedForm = Form.create()(TimeRelatedForm);

ReactDOM.render(<WrappedTimeRelatedForm />, mountNode);
