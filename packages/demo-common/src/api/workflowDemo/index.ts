/* eslint-disable */
import instance from './instance';
import { convertRESTAPI } from '../util';

/** 退回任务候选节点 */
function process_instances_reject_nodes_get(opts) {
  return instance({
    method: 'get',
    url:  '/process-instances/reject-nodes',
    opts: opts
  });
}

/** 删除流程 */
function process_instances_instanceId_delete(opts) {
  return instance({
    method: 'delete',
    url: convertRESTAPI('/process-instances/{instanceId}', opts),
    opts: opts
  });
}

/** 完成任务候选节点 */
function process_instances_complete_nodes_get(opts) {
  return instance({
    method: 'get',
    url:  '/process-instances/complete-nodes',
    opts: opts
  });
}

/** 界面配置 */
function process_instances_ui_config_get(opts) {
  return instance({
    method: 'get',
    url:  '/process-instances/ui-config',
    opts: opts
  });
}

/** 发起流程 */
function process_instances_post(opts) {
  return instance({
    method: 'post',
    url:  '/process-instances',
    opts: opts
  });
}

/** 我的待办 */
function me_todo_list_get(opts) {
  return instance({
    method: 'get',
    url:  '/me/todo-list',
    opts: opts
  });
}

/** 退回 */
function me_todo_list_taskId_delete(opts) {
  return instance({
    method: 'delete',
    url: convertRESTAPI('/me/todo-list/{taskId}', opts),
    opts: opts
  });
}

/** 待办统计 */
function me_todo_list_stats_get(opts) {
  return instance({
    method: 'get',
    url:  '/me/todo-list/stats',
    opts: opts
  });
}

/** 处理待办 */
function me_todo_list_taskId_patch(opts) {
  return instance({
    method: 'patch',
    url: convertRESTAPI('/me/todo-list/{taskId}', opts),
    opts: opts
  });
}

/** 待办数量 */
function me_todo_list_counting_get(opts) {
  return instance({
    method: 'get',
    url:  '/me/todo-list/counting',
    opts: opts
  });
}

/** 撤回任务 */
function me_revoke_tasks_taskId_patch(opts) {
  return instance({
    method: 'patch',
    url: convertRESTAPI('/me/revoke-tasks/{taskId}', opts),
    opts: opts
  });
}

/** 获取申请 */
function applies_id_get(opts) {
  return instance({
    method: 'get',
    url: convertRESTAPI('/applies/{id}', opts),
    opts: opts
  });
}

/** 可撤回任务数 */
function me_revoke_tasks_counting_get(opts) {
  return instance({
    method: 'get',
    url:  '/me/revoke-tasks/counting',
    opts: opts
  });
}

/** 申请审核记录 */
function applies_id_history_get(opts) {
  return instance({
    method: 'get',
    url: convertRESTAPI('/applies/{id}/history', opts),
    opts: opts
  });
}

/** 登录 */
function login_userId_get(opts) {
  return instance({
    method: 'get',
    url: convertRESTAPI('/login/{userId}', opts),
    opts: opts
  });
}

/** 获取当前用户 */
function login_get(opts) {
  return instance({
    method: 'get',
    url:  '/login',
    opts: opts
  });
}

/** 可撤回任务列表 */
function me_revoke_tasks_get(opts) {
  return instance({
    method: 'get',
    url:  '/me/revoke-tasks',
    opts: opts
  });
}

/** 保存申请 */
function applies_id_put(opts) {
  return instance({
    method: 'put',
    url: convertRESTAPI('/applies/{id}', opts),
    opts: opts
  });
}

/** 创建申请 */
function applies_post(opts) {
  return instance({
    method: 'post',
    url:  '/applies',
    opts: opts
  });
}

/** test2 */
function applies_test2_post(opts) {
  return instance({
    method: 'post',
    url:  '/applies/test2',
    opts: opts
  });
}

/** test */
function applies_test_get(opts) {
  return instance({
    method: 'get',
    url:  '/applies/test',
    opts: opts
  });
}

export {
  process_instances_reject_nodes_get,
  process_instances_instanceId_delete,
  process_instances_complete_nodes_get,
  process_instances_ui_config_get,
  process_instances_post,
  me_todo_list_get,
  me_todo_list_taskId_delete,
  me_todo_list_stats_get,
  me_todo_list_taskId_patch,
  me_todo_list_counting_get,
  me_revoke_tasks_taskId_patch,
  applies_id_get,
  me_revoke_tasks_counting_get,
  applies_id_history_get,
  login_userId_get,
  login_get,
  me_revoke_tasks_get,
  applies_id_put,
  applies_post,
  applies_test2_post,
  applies_test_get
};
