import React, { Component } from 'react';
import { Form, Select, Modal } from 'antd';
import { OpinionStrategy } from 'demo-common/src/types/Operation';

const FormItem = Form.Item;

interface OwnerProps {
  opinionStrategy: OpinionStrategy;
}

class TimeRelatedForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
      }
    });
  };

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
        <FormItem
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedTimeRelatedForm = Form.create()(TimeRelatedForm);

ReactDOM.render(<WrappedTimeRelatedForm />, mountNode);
