const db = require('../database/dbSetup');

async function getAllTodoItems() {
    let result = await db.find({});
    console.log(result);
    return result;
}

async function getOneTodoItem(id) {
    return await db.findOne({ _id: id })
}

async function postTodoItem(todoItem) {
    return await db.insert(todoItem);
}

async function removeTodoItem(id) {
    console.log('TODOITEM:', id)
    return await db.remove({_id: id});
}

//tanken är att alla modeller ska ha lite mer logik som denna inom en snar framtid. istället för att ha det i controllern
async function updateTodoItem(id, todoItem) {
    const { title, content, done } = todoItem;

    return await db.update( {_id: id}, { $set: { title, content, done }});
}

module.exports = {
    getAllTodoItems, getOneTodoItem, postTodoItem, removeTodoItem, updateTodoItem
}