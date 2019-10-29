import React from 'react';
import style from './TodoListFooter.module.css';
import ButtonFilter from './ButtonFilter';
import { statuses } from '../../redux/todo-reducer';

class TodoListFooter extends React.Component {

    state={
        selectedButton: '1',
        filterTypes: ['All', 'Completed', 'Active'],
    }

    onButtonFilterClick = (filterType, e) => {
        this.props.changeFilter(filterType)
        this.setState({selectedButton : e.currentTarget.id})
    }

    render = () => {
        let buttons =[];
        for (let i = 1; i < 4; i++){
            buttons.push( <ButtonFilter id={i} key={i}
                selected = {i===this.state.selectedButton}
                onClick={(e) => { this.onButtonFilterClick(this.state.filterTypes[i-1],e) }} > {this.state.filterTypes[i-1]} </ButtonFilter>)
        }



        return (<div>

            <div className={style.footerButton}>
                {buttons}
            </div>

            <div className={style.status}>
                <span>Status: </span>

        {this.props.status === statuses.REQUEST &&  <img src="https://loading.io/spinners/rolling/lg.curve-bars-loading-indicator.gif" alt='request'></img> }
        {this.props.status === statuses.SUCCESS &&  <img src="https://png.pngtree.com/svg/20170519/77b65bfe9d.png" alt='success'></img> }
        {this.props.status === statuses.ERROR &&  <img src="https://cdn2.iconfinder.com/data/icons/weby-flat-vol-1/512/1_warning-caution-exclamation-alert-attention-error-rounded-red-512.png" alt='error' ></img> }
        {this.props.status === statuses.NONE &&  <img src="https://png.pngtree.com/svg/20170728/8580e4d19d.png" alt='none'></img> }      
                      
            </div>
        </div>
        );
    }
}

export default TodoListFooter;

