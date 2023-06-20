const {Todo} = require('../services/db');
const paramsValidator = require('../services/paramsValidator.service');

function getAll() {
    return Todo.find();
}
async function getById(id) {
    if(!paramsValidator.validId(id)){
        throw new Error('id is invalid');
    }
    const todo = Todo.findById(id);
    if(!todo){
        throw new Error('No Todo matches the requested ID');
    }
    return todo;
}

function deleteTodo(todo) {
    return Todo.deleteOne(todo)
}

function createNew(reqBody) {
    const {title, deadline} = reqBody;
    if(!title || !deadline){
        throw new Error('Missing information on request')
    }
    const todo = new Todo({
        title,
        completed: false
    });
    return todo.save();
}

function updateTodo(todo, {title, changeStatus}) {
    if(title && title !== todo.title){
        todo.title = title;
    }
    if(changeStatus){
        todo.completed = !todo.completed;
    }
    return todo.save()
}

module.exports = {getAll, getById, deleteTodo, createNew,updateTodo}