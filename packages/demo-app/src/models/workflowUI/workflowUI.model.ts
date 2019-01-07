import { api, utils } from 'demo-common';
import { Action } from 'redux-actions';
import { EffectsCommandMap } from 'dva';
import { push } from 'react-router-redux';
import { TodoType } from 'demo-common/src/enums';
import { WorkflowUIProps } from '../../types/WorkflowUIProps.d';
import wrappedWorkflowUIActions from './workflowUI.action';

const workflowUIActions = utils.unwrapActions(wrappedWorkflowUIActions);

interface DefalutState {
  (): WorkflowUIProps | {};
}

const defalutState: DefalutState = () => ({});

export default {
  namespace: 'workflowUI',
  state: defalutState(),
  reducers: {
    reset() {
      return defalutState();
    },
    set(state: WorkflowUIProps, { payload }: Action<any>) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *showUI(
      { payload: { applyId, taskId, processInstanceId, todoType } }: Action<any>,
      { call, put }: EffectsCommandMap
    ) {
      // REVOKABLE 目前的实现一个流程只配置了一个UI, 使用 processInstanceId 获取
      const params =
        todoType === TodoType.REVOKABLE
          ? { type: 'process', id: processInstanceId }
          : { type: 'task', id: taskId };
      const { data: UICofing } = yield call(api.workflowDemo.process_instances_ui_config_get, {
        params,
      });

      // 保存配置
      yield put(
        workflowUIActions.set(UICofing, {
          applyId,
          taskId,
          processInstanceId,
        })
      );
      // 跳转路由
      yield put(push('/center/workflow-ui'));
    },
    *createProcess({ payload }: Action<any>, { call, put }: EffectsCommandMap) {
      const {
        data: { task },
      } = yield call(api.workflowDemo.process_instances_post);

      // @ts-ignore
      yield put.resolve(
        workflowUIActions.showUI({
          taskId: task.id,
          processInstanceId: task.processInstanceId,
          todoType: TodoType.PENDING,
        })
      );
    },
  },
};
