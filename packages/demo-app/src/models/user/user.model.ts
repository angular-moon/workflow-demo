import { api } from 'demo-common';
import { Action } from 'redux-actions';
import { EffectsCommandMap } from 'dva';
import User from '../../types/User';

const userJson = localStorage.getItem('user');

const defalutState: User | {} = userJson ? JSON.parse(userJson) : {};

export default {
  namespace: 'user',
  state: defalutState,
  reducers: {
    setUser(state: User, { payload }: Action<any>) {
      if (payload) return { ...state, ...payload };
      return null;
    },
  },
  effects: {
    *login({ payload: user }: Action<any>, { call, put }: EffectsCommandMap) {
      const { data } = yield call(api.workflowDemo.login_userId_get, {
        path: { userId: user.id },
      });
      localStorage.setItem('user', JSON.stringify(data.user));
      yield put({ type: 'setUser', payload: data.user });
    },
  },
};
