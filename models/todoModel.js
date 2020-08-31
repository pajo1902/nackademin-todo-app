const db = require('../database/dbSetup');

//hämta alla
async function getAllTodoItems(id) {
    // console.log('ID: ', id)
    let result = await db.items.find({ createdBy: id });
    console.log('Results: ', result);
    return result;
}

//hämta en todo
async function getOneTodoItem(id) {
    return await db.items.findOne({ _id: id })
}

//skapa en todo
async function postTodoItem(todoItem) {
    return await db.items.insert(todoItem);
}

//ta bort en todo
async function removeTodoItem(id) {
    console.log('TODOITEM:', id)
    return await db.items.remove({_id: id});
}

//tanken är att alla modeller ska ha lite mer logik som denna inom en snar framtid. istället för att ha det i controllern
async function updateTodoItem(id, todoItem) {
    const { title, content, done } = todoItem;

    return await db.items.update( {_id: id}, { $set: { title, content, done }});
}

module.exports = {
    getAllTodoItems, getOneTodoItem, postTodoItem, removeTodoItem, updateTodoItem
}