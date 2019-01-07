import { LocaleProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { utils } from 'demo-common';
import { OperationType } from 'demo-common/src/enums';
import { OpinionStrategy } from 'demo-common/src/types/Operation.d';
import React from 'react';
import { hot, setConfig } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import ApplyForm from './components/ApplyForm';
import { Mode } from './components/ApplyForm/enums/Mode';
import ApplyView from './components/ApplyView';

const App = () => (
  <LocaleProvider locale={zhCN}>
    <Provider store={utils.stateContainer._store}>
      <Router history={utils.stateContainer._history}>
        <ApplyView
          applyId="1"
          processInstanceId="1"
          taskId="1"
          operations={[
            {
              name: '提交',
              type: OperationType.SUBMIT,
              selectKey: '1',
              opinionStrategy: OpinionStrategy.OPTIONAL,
            },
          ]}
        />
        <ApplyForm
          applyId="1"
          processInstanceId="1"
          taskId="1"
          mode={Mode.CREATE}
          operations={[
            {
              name: '提交',
              type: OperationType.SUBMIT,
              selectKey: '1',
              opinionStrategy: OpinionStrategy.OPTIONAL,
            },
          ]}
        />
      </Router>
    </Provider>
  </LocaleProvider>
);

// @ts-ignore
setConfig({ pureSFC: true });
export default hot(module)(App);
