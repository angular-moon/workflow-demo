import React, { useEffect } from 'react';
import { Prompt } from 'react-router-dom';
import { utils, api } from 'demo-common';

const { popup, setRouterConfirm, resetRouterConfirm } = utils;

interface Props {
  when: boolean;
  processInstanceId: string;
}

const ApplyPrompt = (props: Props) => {
  const { when, processInstanceId } = props;

  const confirm = message =>
    new Promise((resolve, reject) => {
      /* eslint-disable no-unused-expressions */
      const ok = window.confirm(message);
      if (ok) {
        api.workflowDemo
          .process_instances_instanceId_delete({
            path: {
              instanceId: processInstanceId,
            },
          })
          .then(resolve, () => {
            popup.error('删除此采购申报失败, 请稍后再试!');
            reject();
          });
      }
    });

  useEffect(() => {
    setRouterConfirm(confirm);
    return resetRouterConfirm;
  }, []);

  return <Prompt when={when} message="你新建的采购申请尚未提交或保存, 确定要放弃新建吗?" />;
};

export default ApplyPrompt;
