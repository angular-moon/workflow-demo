import { hot, setConfig } from 'react-hot-loader';
import React from 'react';
import { Provider } from 'react-redux';
import { LocaleProvider, Button } from 'antd';
import {
  Router, Route, Link, Switch,
} from 'react-router-dom';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { utils } from 'demo-common';
import Center from './app/Center';
import Login from './app/Login';

const { stateContainer } = utils;

const App = () => (
  <LocaleProvider locale={zhCN}>
    <Provider store={stateContainer._store}>
      <Router history={stateContainer._history}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/center" component={Center} />
        </Switch>
      </Router>
    </Provider>
  </LocaleProvider>
);

// @ts-ignore
setConfig({ pureSFC: true });
export default hot(module)(App);
