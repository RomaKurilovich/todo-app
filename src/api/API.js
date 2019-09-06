import * as axios from "axios";

export const API = {
    getTasks(widgetId) {
        return axios.get(`https://repetitora.net/api/JS/Tasks?widgetId=${widgetId}`);
    },
    addTask(widgetId, taskTitle) {
        return axios.post(`https://repetitora.net/api/JS/Tasks?widgetId=${widgetId}`,
            {
                title: taskTitle
            });
    },
    updateTaskStatus(widgetId, taskId, done) {
        return axios.put(`https://repetitora.net/api/JS/Tasks?widgetId=${widgetId}`,
            {
                taskId: taskId,
                done: done
            });
    },
    updateTaskTitle(widgetId, taskId, title) {
        return axios.put(`https://repetitora.net/api/JS/Tasks?widgetId=${widgetId}`,
            {
                taskId: taskId,
                title: title
            });
    },
    deleteTask(widgetId, taskId) {
        return axios.delete(`https://repetitora.net/api/JS/Tasks?widgetId=${widgetId}&taskId=${taskId}`);
    }

};