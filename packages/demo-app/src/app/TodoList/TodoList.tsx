/* eslint-disable */
import React, { Component } from 'react';
import { Button, Table } from 'antd';
import { ActionCreatorsMapObject, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { utils, enums } from 'demo-common';
import todoListModel from './todoList.model';
import Pagination from '../../types/Pagination';
import todoListActions from './todoList.action';
import { RouteComponentProps } from 'react-router';
import { Handle } from '../../components/Operation';

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
      const { id: taskId, processInstanceId, todoType } = record.task;
      const applyId = record.apply && record.apply.id;
      return (
        <Handle
          applyId={applyId}
          taskId={taskId}
          processInstanceId={processInstanceId}
          todoType={todoType}
        />
      );
    },
  },
];

interface RouteParams {
  todoType: enums.TodoType;
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
    todoListBoundActions.fetch(match.params.todoType);
  }

  onPageChange = current => {
    const { todoListBoundActions, match } = this.props;
    todoListBoundActions.setPagination({
      current,
    });
    todoListBoundActions.fetch(match.params.todoType);
  };

  render() {
    const { todos, pagination, match } = this.props;
    const dataSource = todos.map(todo => ({ ...todo, todoType: match.params.todoType }));
    return (
      <>
        <h1>TodoList</h1>
        <Table
          dataSource={dataSource}
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
