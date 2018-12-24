import { api, utils } from 'demo-common';
import { Action } from 'redux-actions';
import { EffectsCommandMap } from 'dva';
import { Put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { WorkflowUI } from './workflowUI';
import wrappedWorkflowUIActions from './workflowUI.action';

const workflowUIActions = utils.unwrapActions(wrappedWorkflowUIActions);

interface DefalutState {
  (): WorkflowUI;
}

const defalutState: DefalutState = () => ({ url: null, operations: [] });

export default {
  namespace: 'workflowUI',
  state: defalutState(),
  reducers: {
    reset() {
      return defalutState();
    },
    set(state: WorkflowUI, { payload }: Action<any>) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *showUI({ payload: taskId }: Action<any>, { call, put }: EffectsCommandMap) {
      try {
        // 获取处理UI配置
        const { data } = yield call(api.workflowDemo.process_instances_ui_config_get, {
          path: { taskId },
        });
        // 保存配置
        yield put(workflowUIActions.set(data));
        // 跳转路由
        yield put(push('/center/WorkflowUI'));
      } catch (e) {
        console.log(e);
      }
    },
    *createWorkflow({ payload }: Action<any>, { call, put }: EffectsCommandMap) {
      try {
        // TODO 替换为创建工作流接口
        console.log('createWorkflow');
        const { data: taskId } = yield call(api.workflowDemo.process_instances_post);
        // @ts-ignore
        yield put.resolve(workflowUIActions.showUI(taskId));
      } catch (e) {
        console.log(e);
      }
    },
  },
};
