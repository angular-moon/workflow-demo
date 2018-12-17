import { api } from 'demo-common';
import { Action } from 'redux-actions';
import { EffectsCommandMap } from 'dva';

type Operation = {
  data?: {};
  name: string;
  opinion: 'NONE' | 'REQUIRE' | 'OPTIONAL';
};

type WorkflowUI = {
  url: string | null;
  props?: {};
  operations: Operation[];
};

const defalutState: () => WorkflowUI = () => ({ url: null, operations: [] });

export default {
  namespace: 'workflowUI',
  state: defalutState(),
  reducers: {
    reset() {
      return defalutState();
    },
    set(state: WorkflowUI, { payload }: Action<any>) {
      if (payload) return { ...state, ...payload };
      return null;
    },
  },
  effects: {
    *fetch({ payload: user }: Action<any>, { call, put }: EffectsCommandMap) {
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
