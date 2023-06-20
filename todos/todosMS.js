const express = require('express');
const Todo = require('./models/todo.model')
const notificationsCommunicator = require('./services/notificationsCommunicator.service')

const todosMS = express();
todosMS.use(express.json());

const status500 = (res, message) => res.status(500).send(message);
const status400 = (res, message) => res.status(400).send(message);
const status200 = (res, message) => res.status(200).send(message);


// Get all
todosMS.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.getAll();
        const todosWithDeadline = await notificationsCommunicator.combineTodosWithDeadline(todos);
        status200(res, todosWithDeadline);
    } catch (e) {
        status500(res, e.message);
    }
});

// Get by ID
todosMS.get('/todos/:id', async (req, res) => {
    try{
        const todo = await Todo.getById(req.params.id);
        if(!todo){
            return status400(res, 'todo with provided ID does not exist');
        }
        const todoWithDeadline = await notificationsCommunicator.combineSingleWithDeadline(todo);
        status200(res, todoWithDeadline);
    }catch (e) {
        status500(res, e.message);
    }
})

// Create new
todosMS.post('/todos', async (req, res) => {
    try {
        const todo = await Todo.createNew(req.body);
        const notification = await notificationsCommunicator.createNewNotification(todo.id, req.body.deadline);
        status200(res, {todo, notification: notification?.data});
    } catch (e) {
        status500(res, e.message);
    }
});

// Update by ID
todosMS.post('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.getById(req.params.id);
        if(!todo){
            return status400(res, 'todo with provided ID does not exist');
        }
        await Todo.updateTodo(todo, {title: req.body.title});
        let notification;
        if(req.body.deadline){
            notification = await notificationsCommunicator.updateDeadline(todo.id, req.body.deadline);
        }
        status200(res, {todo, updatedNotification: notification?.data});
    } catch (e) {
        status500(res, e.message);
    }
});

// Change completed status
todosMS.get('/todos/:id/completed', async (req, res) => {
    try {
        const todo = await Todo.getById(req.params.id);
        if(!todo){
            return status400(res, 'todo with provided ID does not exist');
        }
        await Todo.updateTodo(todo, {changeStatus: true});
        status200(res, todo);
    } catch (e) {
        status500(res, e.message);
    }
});

// Delete by ID
todosMS.get('/todos/:id/delete', async (req, res) => {
    try {
        const todo = await Todo.getById(req.params.id);
        if(!todo){
            status400(res, 'todo with provided ID does not exist');
        }
        await notificationsCommunicator.deleteNotification(todo.id)
        await Todo.deleteTodo(todo);
        status200(res, 'Todo deleted');
    } catch (e) {
        status500(res, e.message);
    }
});

todosMS.listen(3000, () => console.log('Todos listening on port 3000'));