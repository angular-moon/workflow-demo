import { hot, setConfig } from 'react-hot-loader';
import React from 'react';
import { Provider } from 'react-redux';
import { LocaleProvider, Modal } from 'antd';
import { Router, Route, Link, Switch } from 'react-router-dom';
import { utils } from 'demo-common';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { TodoType, OperationType } from 'demo-common/src/enums';
import { Opinion } from 'demo-common/src/types/Operation';
import ApplyView from './components/ApplyView';
import ApplyForm, { Mode } from './components/ApplyForm';

const App = () => (
  <LocaleProvider locale={zhCN}>
    <Provider store={utils.stateContainer._store}>
      <Router history={utils.stateContainer._history}>
        <div>
          <ApplyView id="121" />
          <ApplyForm
            mode={Mode.CREATE}
            todoType={TodoType.PENDING}
            operations={[
              {
                name: '提交',
                type: OperationType.SUBMIT,
                opinion: Opinion.NONE,
              },
            ]}
          />
        </div>
      </Router>
    </Provider>
  </LocaleProvider>
);

// @ts-ignore
setConfig({ pureSFC: true });
export default hot(module)(App);
