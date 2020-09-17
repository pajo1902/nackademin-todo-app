const db = require('../database/dbSetup');

//skapa en todo
async function postTodoItem(todoItem) {
    return await db.items.insert(todoItem);
}

//hämta en todo
async function getOneTodoItem(id) {
    return await db.items.findOne({ _id: id });
}

//hämta alla todos
async function getAllTodoItems(id) {
    let result = await db.items.find({ createdBy: id });
    return result;
}

//uppdatera en todo
async function updateTodoItem(id, todoItem) {
    const { title, done, urgent } = todoItem;

    return await db.items.update( {_id: id}, { $set: { title, done, urgent }});
}

//ta bort en todo
async function removeTodoItem(id) {
    return await db.items.remove(id, { multi: true });
}

//rensa alla test todos
async function clearTestItems() {
    return await db.items.remove({}, { multi: true });
}

module.exports = {
    getAllTodoItems, getOneTodoItem, postTodoItem, removeTodoItem, updateTodoItem, clearTestItems
}