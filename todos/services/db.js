const mongoose = require("mongoose");

const uri = "mongodb+srv://PayboxTodos:PayboxTodos123@freetier.yz5x7ud.mongodb.net/Paybox?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true});
const todoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema );

module.exports = {Todo};