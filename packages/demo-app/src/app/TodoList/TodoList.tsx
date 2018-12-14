/* eslint-disable */
import React, { Component } from 'react';
import { Button, Table } from 'antd';
import { ActionCreatorsMapObject, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { BizState } from '../../enum/BizState.enum';
import { utils } from 'demo-common';
import todoListModel from './todoList.model';
import Pagination from '../../types/Pagination';
import todoListActions from './todoList.action';
import { RouteComponentProps } from 'react-router';

const { bindActions, stateContainer } = utils;

stateContainer.injectModel(todoListModel);

const columns = [
  {
    title: '任务名称',
    dataIndex: 'task.name',
  },
  {
    title: '采购目录',
    dataIndex: 'apply.stockDirName',
  },
  {
    title: '采购预算',
    dataIndex: 'apply.money',
  },
  {
    title: '操作',
    render(value, record) {
      return <Button type="primary">处理</Button>;
    },
  },
];

interface RouteParams {
  bizState: BizState;
}

interface StateProps {
  pagination: Pagination;
  todos: any[];
}

interface DispatchProps {
  todoListBoundActions: ActionCreatorsMapObject;
}

type Props = StateProps & DispatchProps & RouteComponentProps<RouteParams>;

class TodoList extends Component<Props, {}> {
  componentDidMount() {
    const { todoListBoundActions, match } = this.props;
    todoListBoundActions.reset();
    todoListBoundActions.fetch(match.params.bizState);
  }

  onPageChange = current => {
    const { todoListBoundActions, match } = this.props;
    todoListBoundActions.setPagination({
      current,
    });
    todoListBoundActions.fetch(match.params.bizState);
  };

  render() {
    const { todos, pagination } = this.props;
    return (
      <>
        <h1>TodoList</h1>
        <Table
          dataSource={todos}
          columns={columns}
          rowKey={record => record.task.id}
          pagination={{ ...pagination, onChange: this.onPageChange }}
        />
      </>
    );
  }
}
function mapStateToProps({ todoList: { todos, pagination } }): StateProps {
  return { todos, pagination };
}

function mapDispatchToProps(dispatch): DispatchProps {
  // @ts-ignore
  return bindActions(todoListActions)(dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
