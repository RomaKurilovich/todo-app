import React from 'react';
import style from './TodoListTasks.module.css';
import TodoListTask from "./TodoListTask/TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {

        let { updateTaskStatus, deleteTask, changeTitle} = this.props;

        let tasksElements = this.props.tasks.map( (task, index) => <TodoListTask key={index} title={task.title}
                                                                        done={task.done}
                                                                        // priority={task.priority}
                                                                        taskId={task.taskId}
                                                             updateTaskStatus={updateTaskStatus}
                                                             deleteTask={deleteTask}
                                                             changeTitle={changeTitle}
        />);

        return (
            <div className={style.todoListTasks}>
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

