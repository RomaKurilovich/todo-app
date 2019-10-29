import React from 'react';
import style from './TodoListHeader.module.css';
import { statuses } from "../../redux/todo-reducer";

class TodoListHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = { title: '' }


        this.onTitleChange = (e) => {
            this.setState({ title: e.currentTarget.value });
        };

        this.onAddTask = () => {
            if (this.state.title.length > 0) {
                this.props.addTask(this.state.title);
                if (this.props.status === statuses.SUCCESS) {
                    this.setState({ title: '' });
                }
            } else {
                this.props.changeStatus('error')
                alert('please enter note')
            }
        }

    }
    render = () => {
        return (
            <div className={style.todoListHeader}>

                <h3>My tasks</h3>

                <div className={style.todoListNewTaskForm}>

                    <input type="text"
                        value={this.state.title}
                        ref={this.newTaskInputRef}
                        maxLength="20"
                        placeholder="New task name"
                        onChange={this.onTitleChange} />

                    <button disabled={this.props.status === statuses.REQUEST} onClick={this.onAddTask}>Add</button>

                </div>
            </div>
        );
    }
}

export default TodoListHeader;

