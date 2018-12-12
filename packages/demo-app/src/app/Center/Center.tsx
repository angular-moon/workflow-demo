import React from 'react';
import { Layout } from 'antd';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import Menu from '../Menu';
import TodoCounting from '../TodoCounting';

const { Sider, Content } = Layout;

export default ({ match }: RouteComponentProps) => (
  <Layout>
    <Sider>
      <Menu />
    </Sider>
    <Content style={{ minHeight: 700 }}>
      <Switch>
        <Route exact path={match.path} component={TodoCounting} />
      </Switch>
    </Content>
  </Layout>
);
