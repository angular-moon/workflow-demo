import React from 'react';
import { Layout } from 'antd';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import Menu from '../Menu';
import TodoCounting from '../TodoCounting';
import TodoList from '../TodoList';

const { Sider, Content } = Layout;

export default ({ match }: RouteComponentProps) => (
  <Layout style={{ height: '100vh' }}>
    <Sider>
      <Menu />
    </Sider>
    <Content style={{ minHeight: 700 }}>
      <Switch>
        <Route exact path={match.path} component={TodoCounting} />
        <Route exact path={`${match.path}/todos/:bizState`} component={TodoList} />
      </Switch>
    </Content>
  </Layout>
);
