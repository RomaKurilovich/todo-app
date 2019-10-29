import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://calm-plateau-74946.herokuapp.com/'
});

export const API = {
    getTasks() {
        return axiosInstance.get(`tasks`);
    },
    addTask(taskTitle) {
        return axiosInstance.post(`tasks`,
            {
                title: taskTitle
            });
    },
    updateTaskStatus(taskId, done) {
        return axiosInstance.put(`tasks`/ + taskId,
            {
                done: done
            });
    },
    updateTaskTitle(taskId, title) {
        return axiosInstance.put(`tasks`/ + taskId,
            {
                title: title
            });
    },
    deleteTask(taskId) {
        debugger
        return axiosInstance.delete(`tasks`/ + taskId);
    }

};