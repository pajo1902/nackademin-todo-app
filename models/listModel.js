const mongoose = require('mongoose')
require('dotenv').config()

const listSchema = new mongoose.Schema({
    title: String,
    createdBy: String
});

const List = mongoose.model('List', listSchema);

//skapa en lista
async function postTodoList(todoList) {
    return await List.create(todoList);
}

//hämta alla listor
async function getAllTodoLists(userId) {
    return await List.find({ createdBy: userId});
}

//ta bort en lista
async function removeList(id) {
    return await List.deleteMany(id);
}

module.exports = {
    postTodoList, getAllTodoLists, removeList
}