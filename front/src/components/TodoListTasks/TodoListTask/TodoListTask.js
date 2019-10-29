import React from 'react';
import style from './TodoListTask.module.css';

class TodoListTask extends React.Component {
    state = {
        editMode: false,
        title: this.props.title,
        tasks: this.props.tasks
    };

    titleInputRef = React.createRef();

    onSaveClick = () => {
        this.setState({ editMode: false });
        if (this.props.title !== this.state.title) {
            this.props.changeTitle(this.props.taskId, this.state.title);
        }
    };

    onEditClick = () => {
        this.setState({ editMode: true });
    };
    onTitleChanged = (e) => {
        this.setState({ title: e.currentTarget.value });
    };
    onDeleteTask = () => {
        this.props.deleteTask(this.props.taskId)
    }

    render = () => {
        return (
            <div className={style.todolistTask}>
                <div className={style.dataTask}>
                    <input type="checkbox" checked={this.props.done}
                        onChange={e => {
                            this.props.updateTaskStatus(this.props.taskId, e.currentTarget.checked);
                        }} />
                    {this.state.editMode
                        ? <input value={this.state.title} autoFocus={true}
                            onChange={this.onTitleChanged}
                            ref={this.titleInputRef} />
                        : <span >{this.props.title}</span>}
                </div>
                <div className={style.buttonTask}>
                    {this.state.editMode && <button onClick={this.onSaveClick}>save</button>}
                    {!this.state.editMode && <button onClick={this.onEditClick}>edit</button>}
                    <button onClick={this.onDeleteTask}>x</button>
                </div>
            </div>
        );
    }
}

export default TodoListTask;

