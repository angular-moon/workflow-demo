/* eslint-disable */
import instance from './instance';
import { convertRESTAPI } from '../util';

/** 处理待办 */
function me_todo_list_taskId_patch(opts) {
  return instance({
    method: 'patch',
    url: convertRESTAPI('/me/todo-list/{taskId}', opts),
    opts: opts
  });
}

/** 暂存申请列表 */
function me_transient_applications_get(opts) {
  return instance({
    method: 'get',
    url:  '/me/transient-applications',
    opts: opts
  });
}

/** 新增暂存申请 */
function me_transient_applications_post(opts) {
  return instance({
    method: 'post',
    url:  '/me/transient-applications',
    opts: opts
  });
}

/** 暂存申请数 */
function me_transient_applications_counting_get(opts) {
  return instance({
    method: 'get',
    url:  '/me/transient-applications/counting',
    opts: opts
  });
}

/** 删除申请 */
function me_transient_applications_transient_applications_id_delete(opts) {
  return instance({
    method: 'delete',
    url: convertRESTAPI('/me/transient-applications/transient-applications/{id}', opts),
    opts: opts
  });
}

/** 编辑暂存申请 */
function me_transient_applications_id_put(opts) {
  return instance({
    method: 'put',
    url: convertRESTAPI('/me/transient-applications/{id}', opts),
    opts: opts
  });
}

/** 暂存申请提交审核 */
function me_transient_applications_id_patch(opts) {
  return instance({
    method: 'patch',
    url: convertRESTAPI('/me/transient-applications/{id}', opts),
    opts: opts
  });
}

/** deploy */
function flows_post(opts) {
  return instance({
    method: 'post',
    url:  '/flows',
    opts: opts
  });
}

/** remove */
function flows_deploymentId_delete(opts) {
  return instance({
    method: 'delete',
    url: convertRESTAPI('/flows/{deploymentId}', opts),
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

/** 登录 */
function login_userId_get(opts) {
  return instance({
    method: 'get',
    url: convertRESTAPI('/login/{userId}', opts),
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

/** 待办数量 */
function me_todo_list_counting_get(opts) {
  return instance({
    method: 'get',
    url:  '/me/todo-list/counting',
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

/** latestFlow */
function flows_get(opts) {
  return instance({
    method: 'get',
    url:  '/flows',
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

/** 获取采购申报详情 */
function declares_id_get(opts) {
  return instance({
    method: 'get',
    url: convertRESTAPI('/declares/:id', opts),
    opts: opts
  });
}

export {
  me_todo_list_taskId_patch,
  me_transient_applications_get,
  me_transient_applications_post,
  me_transient_applications_counting_get,
  me_transient_applications_transient_applications_id_delete,
  me_transient_applications_id_put,
  me_transient_applications_id_patch,
  flows_post,
  flows_deploymentId_delete,
  login_get,
  login_userId_get,
  me_todo_list_get,
  me_todo_list_counting_get,
  applies_id_get,
  flows_get,
  applies_id_history_get,
  declares_id_get
};
