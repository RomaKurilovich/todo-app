import React from 'react';
import style from './TodoListContainer.module.css'
import TodoListHeader from "./../TodoListHeader/TodoListHeader";
import TodoListTasks from "./../TodoListTasks/TodoListTasks";
import TodoListFooter from "./../TodoListFooter/TodoListFooter";
import {connect} from "react-redux";
import {
    addTaskThunkCreator, deleteTaskThunkCreator,
    fetchTasksThunkCreator,
    updateTaskStatusThunkCreator, updateTaskTitleThunkCreator, changeFilter, changeStatus
} from "../../redux/todo-reducer";
import { getFilteredTasks } from '../../redux/selectors';

class TodoListContainer extends React.Component {
    widgetId = 1234;

    componentDidMount() {
        this.props.fetchTasks(this.widgetId);
    }

    addTask = (taskTitle) => {
        this.props.addTask(this.widgetId, taskTitle);
    };
    onTaskStatusChanged = (taskId, isDone) => {
        this.props.updateTaskStatus(this.widgetId, taskId, isDone)
    };
    onTaskTitleChanged = (taskId, title) => {
        this.props.updateTaskTitle(this.widgetId, taskId, title)
    };
    onTaskDeleted = (taskId) => {
        this.props.deleteTask(this.widgetId, taskId)
    };

    render = () => {
        return (
            <div className={style.myTodoApp}>
                <div className={style.todoListMainDiv}>
                    <TodoListHeader addTask={this.addTask} changeStatus={this.props.changeStatus} status={this.props.status}/>
                    <TodoListTasks tasks={this.props.tasks} updateTaskStatus={this.onTaskStatusChanged} deleteTask={this.onTaskDeleted}
                                   changeTitle={this.onTaskTitleChanged }/>
                    <TodoListFooter changeFilter={this.props.changeFilter} status={this.props.status}/>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    tasks: getFilteredTasks(state),
    status: state.todo.status
});

let mapDispatchToProps = (dispatch) => ({
    fetchTasks: (widgetId) => {
        dispatch(fetchTasksThunkCreator(widgetId));
    },
    updateTaskStatus: (widgetId, taskId, isDone) => {
        dispatch(updateTaskStatusThunkCreator(widgetId, taskId, isDone))
    },
    updateTaskTitle: (widgetId, taskId, title) => {
        dispatch(updateTaskTitleThunkCreator(widgetId, taskId, title))
    },
    addTask: (widgetId, taskTitle) => {
       dispatch(addTaskThunkCreator(widgetId, taskTitle))
    },
    deleteTask: (widgetId, taskId) => {
        dispatch(deleteTaskThunkCreator(widgetId, taskId))
    },
    changeFilter: (value) =>{
        dispatch(changeFilter(value))
    },
    changeStatus: (status) => {
        dispatch(changeStatus(status))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);

