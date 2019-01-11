import React, { SFC, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import { Router } from 'react-router-dom';
import { utils } from 'demo-common';
import zhCN from 'antd/es/locale-provider/zh_CN';

type Props = {
  children: ReactElement<any>;
};

const Wrapper = ({ children }: Props) => (
  <LocaleProvider locale={zhCN}>
    <Provider store={utils.stateContainer._store}>
      <Router history={utils.stateContainer._history}>{children}</Router>
    </Provider>
  </LocaleProvider>
);

export default Wrapper;
