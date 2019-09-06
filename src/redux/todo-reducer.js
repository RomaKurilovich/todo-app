import {API} from "../api/API";


const SET_TASKS = 'SET_TASKS';
const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS';
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE';
const CHANGE_TASK_DESCRIPTION = 'CHANGE_TASK_DESCRIPTION';
const CHANGE_STATUS = 'CHANGE_STATUS';
const CHANGE_FILTER = 'CHANGE_FILTER';

export const statuses = {
    SUCCESS: "success",
    NONE: "none",
    ERROR: "error",
    REQUEST: "request",
};

const initialState = {
    tasks: [],
    status: statuses.NONE,
    filter: 'All', 
};

const changeTask = (state, action, propertyName) => {
    return {...state, tasks: state.tasks.map( t => {
                if (t.id === action.id) {
                    return {...t, [propertyName]: action[propertyName] };
                }
                return t;
        }) }
};

export const todoReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_TASKS: {
            return {...state, tasks: action.tasks}
        }
        case CHANGE_STATUS: {
            return {...state, status: action.status}
        }
        case ADD_TASK: {
            return {...state, tasks: [...state.tasks, action.task]}
        }
        case DELETE_TASK: {
            return {...state, tasks: state.tasks.filter(t => t.id !== action.taskId)}
        }
        case CHANGE_TASK_STATUS: {
            return changeTask(state, action, "done");
        }
        case CHANGE_TASK_TITLE: {
            return changeTask(state, action, "title");
        }
        case CHANGE_TASK_DESCRIPTION: {
            return changeTask(state, action, "description");
        }
        case CHANGE_FILTER: { 
            return {...state, filter: action.value}
        }
        default: return state;
    }
};

export const setTasks = (tasks) => ({type: SET_TASKS, tasks});
export const changeStatus = (status) => ({type: CHANGE_STATUS, status});
export const addTask = (task) => ({type: ADD_TASK, task});
export const deleteTask = (taskId) => ({type: DELETE_TASK, taskId});
export const changeTaskStatus = (id, done) => ({type: CHANGE_TASK_STATUS, done, id});
export const changeTaskTitle = (id, title) => ({type: CHANGE_TASK_TITLE, title, id});
export const changeFilter = (value) => ({type:CHANGE_FILTER, value})

export const fetchTasksThunkCreator =  (widgetId) => {
    return (dispatch) => {
        dispatch(changeStatus(statuses.REQUEST));
        API.getTasks(widgetId)
            .then(res => {
                dispatch(changeStatus(statuses.SUCCESS));
                dispatch(setTasks(res.data));
            });
    };
};

export const addTaskThunkCreator =  (widgetId, taskTitle) => {
    return (dispatch) => {
        dispatch(changeStatus(statuses.REQUEST));
        API.addTask(widgetId, taskTitle)
            .then(res => {
                dispatch(changeStatus(statuses.SUCCESS));
                dispatch(addTask(res.data.task));
            });
    };
};

export const deleteTaskThunkCreator =  (widgetId, taskId) => {
    return (dispatch) => {
        dispatch(changeStatus(statuses.REQUEST));
        API.deleteTask(widgetId, taskId)
            .then(res => 
                dispatch(changeStatus(statuses.SUCCESS)),
                dispatch(deleteTask(taskId)));
    };
};

export const updateTaskStatusThunkCreator =  (widgetId, taskId, isDone) => {
    return (dispatch) => {
        dispatch(changeStatus(statuses.REQUEST));
        API.updateTaskStatus(widgetId, taskId, isDone)
            .then(res => {
                dispatch(changeStatus(statuses.SUCCESS));
                 dispatch(changeTaskStatus(taskId, isDone))
            });
    };
};
export const updateTaskTitleThunkCreator =  (widgetId, taskId, title) => {
    return (dispatch) => {
        dispatch(changeStatus(statuses.REQUEST));
        API.updateTaskTitle(widgetId, taskId, title)
            .then(res => {
                dispatch(changeStatus(statuses.SUCCESS));
                 dispatch(changeTaskTitle(taskId, title))
            });
    };
};