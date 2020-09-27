const mongoose = require('mongoose')
require('dotenv').config()

const listSchema = new mongoose.Schema({
    title: String,
    createdBy: String
});

const List = mongoose.model('List', listSchema);

async function postTodoList(todoList) {
    try {
        const list = await List.create(todoList);
        return list;
    } catch (error) {
        return error;
    }
}

async function getAllTodoLists(userId) {
    try {
        const lists = await List.find({ createdBy: userId});
        return lists;
    } catch (error) {
        return error;
    }
}

async function removeList(id) {
    try {
        const deleted = await List.deleteMany(id);
        return deleted;
    } catch (error) {
        return error;
    }
}

module.exports = {
    postTodoList, getAllTodoLists, removeList
}