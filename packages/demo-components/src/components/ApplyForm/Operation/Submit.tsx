import React from 'react';
import { Button } from 'antd';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { connect } from 'react-redux';
import { utils } from 'demo-common';
import { ActionCreatorsMapObject } from 'redux';
import taskActions from '../../../models/task/task.action';

const { bindActions } = utils;

interface OwnProps {
  text: string;
  form: WrappedFormUtils;
  [key: string]: any;
}

interface DispatchProps {
  taskBoundActions: ActionCreatorsMapObject;
}

type Props = OwnProps & DispatchProps;

const Submit = (props: Props) => {
  const { text, form, select, opinion } = props;

  function submit() {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { taskBoundActions } = props;
        taskBoundActions.submit();
      }
    });
  }

  return (
    <Button type="primary" onClick={submit}>
      {text}
    </Button>
  );
};

function mapDispatchToProps(dispatch): DispatchProps {
  // @ts-ignore
  return bindActions(taskActions)(dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Submit);
