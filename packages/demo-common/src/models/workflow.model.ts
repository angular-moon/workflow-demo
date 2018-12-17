// import { workflowDemo } from '../api';
// import wrappedDeclareActions from '../actions/declare.action';
import { api } from 'demo-common';
import { Action } from 'redux-actions';
import { EffectsCommandMap } from 'dva';

export default {
  namespace: 'workflow',
  state: {},
  reducers: {},
  effects: {
    *reject({ payload: user }: Action<any>, { call, put }: EffectsCommandMap) {
      try {
        // mock 数据不好改, 暂时直接保存user, 不使用接口返回的数据
        const { data } = yield call(api.workflowDemo.login_userId_get, {
          path: { userId: user.id },
        });
        // 暂时保存
        localStorage.setItem('user', JSON.stringify(user));
        yield put({ type: 'setUser', payload: user });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
