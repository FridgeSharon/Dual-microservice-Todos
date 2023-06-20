const axios = require('axios');

const NOTIFICATIONS_MS_URL = 'http://localhost:3001/notifications';
function deleteNotification(todoId) {
    return axios.get(`${NOTIFICATIONS_MS_URL}/${todoId}/delete`)
}

function createNewNotification(todoId, deadline){
    return axios.post(`${NOTIFICATIONS_MS_URL}`, {todoId, deadline})
}

async function combineTodosWithDeadline(todos){
    const todosIds = todos.map(todo => todo.id)
    const notifications = await axios.post(`${NOTIFICATIONS_MS_URL}/getByManyIds`, todosIds);
    const newTodos = [];
    todos.forEach(todo => {
        const notification = notifications.data.find(noti => noti.todoId === todo.id);
        newTodos.push({
            id: todo.id,
            title: todo.title,
            completed: todo.completed,
            deadline: notification.deadline
        })
    })
    return newTodos;
}

async function combineSingleWithDeadline(todo){
    const notification = await axios.get(`${NOTIFICATIONS_MS_URL}/${todo.id}`);
    return {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        deadline: notification.data.deadline
    };
}

function updateDeadline(todoId, deadline) {
    return axios.post(`${NOTIFICATIONS_MS_URL}/${todoId}`, {deadline})
}

module.exports = {deleteNotification, createNewNotification, combineTodosWithDeadline, combineSingleWithDeadline, updateDeadline};