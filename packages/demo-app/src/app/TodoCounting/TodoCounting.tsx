/* eslint-disable */
import React, { Component } from 'react';
import { Button, Badge } from 'antd';
import { ActionCreatorsMapObject, Dispatch } from 'redux';
import { connect, DispatchProp } from 'react-redux';
import { push } from 'react-router-redux';
import { utils } from 'demo-common';
import todoCountingModel, { Countings } from './todoCounting.model';
import todoCountingActions from './todoCounting.action';

const { bindActions, stateContainer } = utils;

stateContainer.injectModel(todoCountingModel);

interface StateProps {
  todoCounting: Countings;
}

interface DispatchProps extends DispatchProp {
  todoCountingBoundActions: ActionCreatorsMapObject;
}

type Props = StateProps & DispatchProps;

class TodoCounting extends Component<Props, {}> {
  componentDidMount() {
    const { todoCountingBoundActions } = this.props;
    todoCountingBoundActions.fetch();
  }

  goTodoList = (todoType: string) => () => {
    const { dispatch } = this.props;
    dispatch(push(`/center/todos/${todoType}`));
  };

  render() {
    const { todoCounting } = this.props;
    return (
      <div style={{ padding: 20 }}>
        {todoCounting.map(todo => (
          <span style={{ margin: 20 }} key={todo.todoType}>
            <Badge count={todo.count} showZero>
              <Button type="default" onClick={this.goTodoList(todo.todoType)}>
                {todo.todoTypeName}
              </Button>
            </Badge>
          </span>
        ))}
      </div>
    );
  }
}
function mapStateToProps({ todoCounting }: any): StateProps {
  return { todoCounting };
}

// const mapDispatchToProps = bindActions(applyActions);
function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
  // @ts-ignore
  return bindActions(todoCountingActions)(dispatch);
}

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(TodoCounting);
