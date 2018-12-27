/* eslint-disable */
import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { delay } from 'dva-core/saga';
import { identity } from 'lodash/fp/identity';
import { utils } from 'demo-common';
import counterActions, { add } from './counterActions';

utils.stateContainer.injectModel({
  namespace: 'counter',
  state: 0,
  reducers: {
    add(state, { payload }) {
      return state + payload * 10;
    },
    minus(state, { payload }) {
      return state - payload;
    },
  },
  effects: {
    *delayAdd({ payload }, { call, put, select }) {
      const counter = yield select(state => state.counter);
      console.log('counter', counter);
      if (counter > 20 && counter < 40) throw new Error('test error ' + counter);
      yield call(delay, 1000);
      yield put({ type: 'add', payload });
    },
  },
});

const mapStateToProps = ({ counter }) => ({ counter: counter });
const mapDispatchToProps = utils.bindActions(counterActions);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({ counter, counterBoundActions }) => {
  async function delayAdd(count) {
    try {
      await counterBoundActions.delayAdd(count);
    } catch (e) {
      console.log('delayAdd', e);
    }
  }

  return (
    <div>
      <h2>{counter}</h2>
      <button key="add" onClick={() => counterBoundActions.add(10)}>
        +
      </button>
      <button key="minus" onClick={() => counterBoundActions.minus(10)}>
        -
      </button>{' '}
      <button key="delayAdd" onClick={() => delayAdd(10)}>
        + delay
      </button>
    </div>
  );
});
