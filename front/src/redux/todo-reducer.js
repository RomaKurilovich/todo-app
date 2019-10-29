import { API } from "../api/API";


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
    return {
        ...state, tasks: state.tasks.map(t => {
            if (t.id === action.id) {
                return { ...t, [propertyName]: action[propertyName] };
            }
            return t;
        })
    }
};

export const todoReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_TASKS: {
            let newArray = action.tasks.map((obj) => {
                obj['taskId'] = obj['_id'];
                delete obj['_id'];
                return obj;
            })

            return { ...state, tasks: newArray }
        }
        case CHANGE_STATUS: {
            return { ...state, status: action.status }
        }
        case ADD_TASK: {
            debugger
            return { ...state, tasks: [...state.tasks, action.task] }
        }
        case DELETE_TASK: {
            debugger
            return { ...state, tasks: state.tasks.filter(t => t.id !== action.taskId) }
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
            return { ...state, filter: action.value }
        }
        default: return state;
    }
};

export const setTasks = (tasks) => ({ type: SET_TASKS, tasks });
export const changeStatus = (status) => ({ type: CHANGE_STATUS, status });
export const addTask = (task) => ({ type: ADD_TASK, task });
export const deleteTask = (taskId) => ({ type: DELETE_TASK, taskId });
export const changeTaskStatus = (id, done) => ({ type: CHANGE_TASK_STATUS, done, id });
export const changeTaskTitle = (id, title) => ({ type: CHANGE_TASK_TITLE, title, id });
export const changeFilter = (value) => ({ type: CHANGE_FILTER, value })

export const fetchTasksThunkCreator = () => {
    return (dispatch) => {
        dispatch(changeStatus(statuses.REQUEST));
        API.getTasks()
            .then(res => {
                dispatch(changeStatus(statuses.SUCCESS));
                dispatch(setTasks(res.data));
            });
    };
};

export const addTaskThunkCreator = (taskTitle) => {
    return (dispatch) => {
        dispatch(changeStatus(statuses.REQUEST));
        API.addTask(taskTitle)
            .then(res => {
                dispatch(changeStatus(statuses.SUCCESS));
                dispatch(addTask(res.data));
                dispatch(fetchTasksThunkCreator());
            });
    };
};

export const deleteTaskThunkCreator = (taskId) => {
    return (dispatch) => {
        dispatch(changeStatus(statuses.REQUEST));
        API.deleteTask(taskId)
            .then(() => {
                dispatch(changeStatus(statuses.SUCCESS));
                dispatch(fetchTasksThunkCreator());
            });
    };
};

export const updateTaskStatusThunkCreator = (taskId, isDone) => {
    return (dispatch) => {
        dispatch(changeStatus(statuses.REQUEST));
        API.updateTaskStatus(taskId, isDone)
            .then(res => {
                dispatch(changeStatus(statuses.SUCCESS));
                dispatch(changeTaskStatus(taskId, isDone));
                dispatch(fetchTasksThunkCreator());
            });
    };
};
export const updateTaskTitleThunkCreator = (taskId, title) => {
    return (dispatch) => {
        dispatch(changeStatus(statuses.REQUEST));
        API.updateTaskTitle(taskId, title)
            .then(res => {
                dispatch(changeStatus(statuses.SUCCESS));
                dispatch(changeTaskTitle(taskId, title));
                dispatch(fetchTasksThunkCreator());
            });
    };
};