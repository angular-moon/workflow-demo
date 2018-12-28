import React from 'react';
import { Spin } from 'antd';
import { SpinProps } from 'antd/es/spin';
import styled from 'styled-components';

const Wrap = styled.div`
  text-align: center;
`;

const StyledSpin = styled(Spin)<SpinProps>`
  padding: 20px 0;
`;

type Props = {
  tip?: string;
};

/* eslint-disable react/prop-types */
export default function Loading(props: Props = { tip: '数据加载中' }) {
  const { tip } = props;

  return (
    <Wrap>
      <StyledSpin tip={tip} />
    </Wrap>
  );
}
