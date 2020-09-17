const mongoose = require('mongoose')
require('dotenv').config()

//behöver jag lägga till role här? funkar detta trots att jag redan skapat ett schema i cloud atlas
const todoSchema = new mongoose.Schema({
    title: String,
    done: Boolean,
    urgent: Boolean,
    listId: String,
    createdBy: String
});

const Todo = mongoose.model('Todo', todoSchema);

//skapa en todo
async function postTodoItem(todoItem) {
    const todo = await Todo.create(todoItem);
    console.log("TODO: ", todo);
    return todo._doc;
}

//hämta en todo
async function getOneTodoItem(id) {
    return await Todo.findOne({ _id: id });
}

//hämta alla todos
async function getAllTodoItems(id) {
    let result = await Todo.find({ createdBy: id });
    return result;
}

//uppdatera en todo
async function updateTodoItem(id, todoItem) {
    const { title, done, urgent } = todoItem;

    return await Todo.updateOne( {_id: id}, { title, done, urgent });
}

//ta bort en todo
async function removeTodoItem(id) {
    return await Todo.deleteMany(id);
}

//rensa alla test todos
async function clearTestItems() {
    return await Todo.deleteMany({});
}

module.exports = {
    getAllTodoItems, getOneTodoItem, postTodoItem, removeTodoItem, updateTodoItem, clearTestItems
}