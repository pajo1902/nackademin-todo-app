const db = require('../database/dbSetup');

//skapa en lista
async function postTodoList(todoList) {
    return await db.lists.insert(todoList);
}

//hämta alla listor
async function getAllTodoLists(userId) {
    return await db.lists.find({ createdBy: userId}, { multi: true });
}

//ta bort en lista
async function removeList(id) {
    return await db.lists.remove(id, { multi: true });
}

module.exports = {
    postTodoList, getAllTodoLists, removeList
}