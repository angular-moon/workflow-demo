import { Icon, Menu } from 'antd';
import { utils } from 'demo-common';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import userModel from '../../models/user/user.model';
import { User } from '../../types/User.d';

interface StateProps {
  user: User;
}

type Props = StateProps;

const MenuLink = styled(Link)`
  && {
    display: inline-block;
  }
`;

class DemoMenu extends React.Component<Props> {
  render() {
    const { user } = this.props;
    return (
      <div>
        <Menu mode="inline" theme="dark" defaultSelectedKeys={['todos']}>
          <Menu.Item key="todos">
            <Icon type="pie-chart" />
            <MenuLink to="/center">我的待办</MenuLink>
          </Menu.Item>
          {/* 经办人 用户id === 1 */}
          {Number(user.id) === 1 ? (
            <Menu.Item key="create">
              <Icon type="form" />
              <MenuLink to="/center/workflow-ui">新建采购申报</MenuLink>
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
