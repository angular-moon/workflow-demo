import React from 'react';
import { Button } from 'antd';
import { goBack } from 'react-router-redux';
import { connect } from 'react-redux';
// @ts-ignore
import { Dispatch } from 'redux';

type OwnerProps = {
  preCancel?: () => Promise<any>;
};

type DispatchProps = {
  dispatch: Dispatch<any>;
};

type Props = OwnerProps & DispatchProps;

const Cancel = (props: Props) => {
  async function cancel() {
    const { preCancel, dispatch } = props;
    if (preCancel && typeof preCancel === 'function') {
      await preCancel();
    }
    dispatch(goBack());
  }

  return (
    <Button type="default" onClick={cancel}>
      取消
    </Button>
  );
};

export default connect()(Cancel);
