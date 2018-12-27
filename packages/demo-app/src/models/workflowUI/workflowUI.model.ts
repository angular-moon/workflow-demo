import { api, utils } from 'demo-common';
import { Action } from 'redux-actions';
import { EffectsCommandMap } from 'dva';
import { push } from 'react-router-redux';
import { TodoType } from 'demo-common/src/enums';
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
    *showUI(
      { payload: { taskId, processInstanceId, applyId, todoType } }: Action<any>,
      { call, put }: EffectsCommandMap
    ) {
      try {
        // 获取处理UI配置
        const params =
          todoType === TodoType.REVOKEABLE
            ? { type: 'process', id: processInstanceId }
            : { type: 'task', id: taskId };
        const { data: UICofing } = yield call(api.workflowDemo.process_instances_ui_config_get, {
          params,
        });
        // 保存配置
        yield put(
          workflowUIActions.set(UICofing, {
            taskId,
            processInstanceId,
            applyId,
          })
        );
        // 跳转路由
        yield put(push('/center/WorkflowUI'));
      } catch (e) {
        console.log(e);
      }
    },
    *createProcess({ payload }: Action<any>, { call, put }: EffectsCommandMap) {
      try {
        const { data: task } = yield call(api.workflowDemo.process_instances_post);
        // @ts-ignore
        yield put.resolve(
          workflowUIActions.showUI({
            taskId: task.id,
            processInstanceId: task.processInstanceId,
            todoType: TodoType.PENDING,
          })
        );
      } catch (e) {
        console.log(e);
      }
    },
  },
};
