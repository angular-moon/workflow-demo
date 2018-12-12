import { Icon, Menu } from 'antd';
import { utils } from 'demo-common';
import React from 'react';
import { connect } from 'react-redux';
import userModel from '../../models/user.model';
import { User } from '../../types/User.d';

interface StateProps {
  user: User;
}

type Props = StateProps;

class DemoMenu extends React.Component<Props> {
  render() {
    const { user } = this.props;
    return (
      <div>
        <Menu mode="inline" theme="dark" defaultSelectedKeys={['todos']}>
          <Menu.Item key="todos">
            <Icon type="pie-chart" />
            <span>我的待办</span>
          </Menu.Item>
          {Number(user.id) === 1 ? (
            <Menu.Item key="create">
              <Icon type="form" />
              <span>新建采购申报</span>
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
