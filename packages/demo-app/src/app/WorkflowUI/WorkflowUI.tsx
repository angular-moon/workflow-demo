import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { utils } from 'demo-common';
import { workflowUIModel } from '../../models/workflowUI';
import CloudComponent from '../../components/CloudComponent';
import { WorkflowUIProps } from '../../types/WorkflowUIProps.d';

const { stateContainer } = utils;

stateContainer.injectModel(workflowUIModel);

type StateProps = WorkflowUIProps;

type Props = StateProps;

const WorkflowUI = (props: Props) => {
  const { url, data, ...restProps } = props;

  return url ? <CloudComponent url={url} {...data} {...restProps} /> : <Redirect to="/center" />;
};

function mapStateToProps({ workflowUI }: any): StateProps {
  return { ...workflowUI };
}

export default connect(
  mapStateToProps,
  null
)(WorkflowUI);
