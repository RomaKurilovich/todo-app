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

    componentDidMount() {
        this.props.fetchTasks();
    }

    addTask = (taskTitle) => {
        this.props.addTask(taskTitle);
    };
    onTaskStatusChanged = (taskId, isDone) => {
        this.props.updateTaskStatus(taskId, isDone)
    };
    onTaskTitleChanged = (taskId, title) => {
        this.props.updateTaskTitle(taskId, title)
    };
    onTaskDeleted = (taskId) => {
        this.props.deleteTask(taskId)
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
    fetchTasks: () => {
        dispatch(fetchTasksThunkCreator());
    },
    updateTaskStatus: (taskId, isDone) => {
        dispatch(updateTaskStatusThunkCreator(taskId, isDone))
    },
    updateTaskTitle: (taskId, title) => {
        dispatch(updateTaskTitleThunkCreator(taskId, title))
    },

    addTask: (taskTitle) => {
       dispatch(addTaskThunkCreator(taskTitle))
    },
    deleteTask: (taskId) => {
        dispatch(deleteTaskThunkCreator(taskId))
    },
    changeFilter: (value) =>{
        dispatch(changeFilter(value))
    },
    changeStatus: (status) => {
        dispatch(changeStatus(status))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);

