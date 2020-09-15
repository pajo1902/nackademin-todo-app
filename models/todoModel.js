//Modellen:
//Database logic for creating a resource etc.
//May return some data about the operation
//or throw an exception if an error occurs
//Do not use res or req

const db = require('../database/dbSetup');

//hämta alla
async function getAllTodoItems(id) {
    // console.log('ID: ', id)
    let result = await db.items.find({ createdBy: id });
    // console.log('Results: ', result);
    return result;
}

//hämta en todo
async function getOneTodoItem(id) {
    return await db.items.findOne({ _id: id });
}

//skapa en todo
async function postTodoItem(todoItem) {
    return await db.items.insert(todoItem);
}

//skapa en lista
async function postTodoList(todoList) {
    return await db.lists.insert(todoList);
}

//hämta en användares listor
async function getAllTodoLists(userId) {
    return await db.lists.find({ createdBy: userId}, { multi: true });
}

//ta bort en todo
async function removeTodoItem(par) {
    // console.log('removed: ', par)
    return await db.items.remove(par, { multi: true });
}

//uppdatera en todo
async function updateTodoItem(id, todoItem) {
    const { title, content, done } = todoItem;

    return await db.items.update( {_id: id}, { $set: { title, content, done }});
}

//rensa test todo items
async function clearTestItems() {
    return await db.items.remove({}, { multi: true });
}

module.exports = {
    getAllTodoItems, getOneTodoItem, postTodoItem, removeTodoItem, updateTodoItem, postTodoList, clearTestItems, getAllTodoLists
}