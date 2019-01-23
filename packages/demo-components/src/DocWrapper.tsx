import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import { utils } from 'demo-common';
import zhCN from 'antd/es/locale-provider/zh_CN';

type Props = {
  children: ReactElement<any>;
};

const Wrapper = ({ children }: Props) => (
  <LocaleProvider locale={zhCN}>
    <Provider store={utils.stateContainer._store}>{children}</Provider>
  </LocaleProvider>
);

export default Wrapper;
