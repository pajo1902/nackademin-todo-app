const mongoose = require('mongoose')
require('dotenv').config()

const todoSchema = new mongoose.Schema({
    title: String,
    done: Boolean,
    urgent: Boolean,
    listId: String,
    createdBy: String
});

const Todo = mongoose.model('Todo', todoSchema);

async function postTodoItem(todoItem) {
    try {
        const todo = await Todo.create(todoItem);
        return todo._doc;
    } catch (error) {
        return error;
    }
}

async function getOneTodoItem(id) {
    try {
        const todo = await Todo.findOne({ _id: id });
        return todo;
    } catch (error) {
        return error;
    }
}

async function getAllTodoItems(id) {
    try {
        let todos = await Todo.find({ createdBy: id });
        return todos;
    } catch (error) {
        return error;
    }
}

async function updateTodoItem(id, todoItem) {
    try {
        const { title, done, urgent } = todoItem;
        const todo = await Todo.updateOne( {_id: id}, { title, done, urgent });
        return todo;
    } catch (error) {
        return error;
    }
}

async function removeTodoItem(id) {
    try {
        const deleted = await Todo.deleteMany(id);
        return deleted;
    } catch (error) {
        return error;
    }
}

async function clearTestItems() {
    try {
        const deleted = await Todo.deleteMany({});
        return deleted;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getAllTodoItems, getOneTodoItem, postTodoItem, removeTodoItem, updateTodoItem, clearTestItems
}