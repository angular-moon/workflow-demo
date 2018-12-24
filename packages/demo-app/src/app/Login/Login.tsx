/* eslint-disable */
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { ActionCreatorsMapObject, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { userModel, userActions } from '../../models/user';
import { utils } from 'demo-common';
import styled from 'styled-components';

const Option = Select.Option;
const FormItem = Form.Item;

utils.stateContainer.injectModel(userModel);

type Props = FormComponentProps & {
  className: string;
  dispatch: Dispatch<any>;
  userBoundActions: ActionCreatorsMapObject;
};

const users = [
  {
    id: 1,
    name: '经办人A',
  },
  {
    id: 2,
    name: '上级领导A',
  },
  {
    id: 3,
    name: '分管领导A',
  },
  {
    id: 4,
    name: '主要领导A',
  },
];

class LoginForm extends Component<Props, {}> {
  handleSubmit = e => {
    e.preventDefault();
    const { form, userBoundActions, dispatch } = this.props;

    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          await userBoundActions.login(users.find(user => user.id === values.userId));
          dispatch(push('/center'));
        } catch (e) {
          console.log('LoginForm', e);
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className={this.props.className}>
          <FormItem>
            {getFieldDecorator('userId', {
              initialValue: users[0].id,
            })(
              <Select>
                {users.map(user => (
                  <Option value={user.id} key={String(user.id)}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {})(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="随便填"
              />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="ant-btn-block">
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedLoginForm = Form.create()(styled(LoginForm)`
  background: #484d5f;
  position: fixed;
  width: 100%;
  height: 100%;
  padding: 100px 20% 20% 20%;
`);

const mapDispatchToProps = utils.bindActions(userActions);

export default connect(
  null,
  mapDispatchToProps
)(WrappedLoginForm);
