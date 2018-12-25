import React from 'react';
import { Layout } from 'antd';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import Menu from '../Menu';
import TodoCounting from '../TodoCounting';
import TodoList from '../TodoList';
import WorkflowUI from '../WorkflowUI';

const { Sider, Content } = Layout;

export default ({ match }: RouteComponentProps) => (
  <Layout style={{ height: '100vh' }}>
    <Sider>
      <Menu />
    </Sider>
    <Content style={{ minHeight: 700, padding: 20 }}>
      <Switch>
        <Route exact path={match.path} component={TodoCounting} />
        <Route path={`${match.path}/todos/:todoType`} component={TodoList} />
        <Route path={`${match.path}/workflow-ui`} component={WorkflowUI} />
      </Switch>
    </Content>
  </Layout>
);
