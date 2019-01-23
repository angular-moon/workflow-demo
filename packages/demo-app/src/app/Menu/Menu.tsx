import { Icon, Menu } from 'antd';
import { utils } from 'demo-common';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { includes } from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import userModel from '../../models/user/user.model';
import { User } from '../../types/User.d';
import Create from '../../components/Operation/Create';
import { WorkflowUIProps } from '../../types/WorkflowUIProps';

interface StateProps {
  user: User;
}

type Props = StateProps;

const MenuLink = styled(Link)`
  && {
    display: inline-block;
  }
`;

class DemoMenu extends Component<Props> {
  state = {
    selectedKeys: ['todos'],
  };

  onSelect = ({ selectedKeys }) => {
    this.setState(() => ({ selectedKeys }));
  };

  render() {
    const { user } = this.props;
    const { selectedKeys } = this.state;
    return (
      <div>
        <Menu mode="inline" theme="dark" defaultSelectedKeys={['todos']} onSelect={this.onSelect}>
          <Menu.Item key="todos">
            <Icon type="pie-chart" />
            <MenuLink to="/center">我的待办</MenuLink>
          </Menu.Item>
          {/* 经办人 用户id === 1 */}
          {Number(user.id) === 1 ? (
            <Menu.Item key="create">
              <Icon type="form" />
              <Create disabled={includes(selectedKeys, 'create')} />
            </Menu.Item>
          ) : null}
        </Menu>
      </div>
    );
  }
}

utils.stateContainer.injectModel(userModel);
function mapStateToProps({ user }) {
  return { user };
}

export default connect(
  mapStateToProps,
  null
)(DemoMenu);
