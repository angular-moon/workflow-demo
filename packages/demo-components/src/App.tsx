import { hot, setConfig } from 'react-hot-loader';
import React from 'react';
import { Provider } from 'react-redux';
import { LocaleProvider, Modal } from 'antd';
import { Router, Route, Prompt, Link } from 'react-router-dom';
import { utils } from 'demo-common';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { TodoType, OperationType } from 'demo-common/src/enums';
import { OpinionStrategy } from 'demo-common/src/types/Operation';
import ApplyView from './components/ApplyView';
import ApplyForm from './components/ApplyForm';
import { Mode } from './components/ApplyForm/enums/Mode';
import Counter from './components/Counter/Counter';
import { getConfirmation } from './utils/getConfirmation';

const App = () => (
  <LocaleProvider locale={zhCN}>
    <Provider store={utils.stateContainer._store}>
      <Router history={utils.stateContainer._history}>
        <Link to="/Form">Form</Link>
        <Route
          path="/"
          render={() => (
            <ApplyForm
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
                {
                  name: '退回',
                  type: OperationType.REJECT,
                  selectKey: '1',
                  opinionStrategy: OpinionStrategy.OPTIONAL,
                },
              ]}
            />
          )}
        />
      </Router>
    </Provider>
  </LocaleProvider>
);

// @ts-ignore
setConfig({ pureSFC: true });
export default hot(module)(App);
