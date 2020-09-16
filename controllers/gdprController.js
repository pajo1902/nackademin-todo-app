const userModel = require('../models/userModel.js');
const listModel = require('../models/listModel.js');
const todoModel = require('../models/todoModel.js');

//hämta en användares all data inklusive todos, listor och användaruppgifter
async function getAllUserContent(req, res) {
    try {
        const userId = req.params.id;
        const userData = await userModel.getUser(userId);
        const todoLists = await listModel.getAllTodoLists(userId);
        const todoItems = await todoModel.getAllTodoItems(userId);
        console.log("userdata: ", userData);
        if (userData) {
            res.status(200).send({ 
                userData, todoLists, todoItems
            });
        } else {
            res.status(400).send('Bad request');
            console.log('fan nåt gick åt skogen!');
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

//ta bort användare och allt den skapat
async function remove(req, res) {
    try {
        const userId = req.params.id;
        const deletedList = await listModel.removeList({createdBy: userId });
        const deletedTodo = await todoModel.removeTodoItem({createdBy: userId });
        const deletedUser = await userModel.removeUser(userId);
        console.log(deletedList);
        console.log(deletedTodo);
        console.log(deletedUser);

        if (deletedUser === 0) {
            res.status(404).send('The user didnt exist!');
        } else if (deletedUser  === 1 && deletedList === 0) {
            res.status(200).send('The user was deleted and there werent any lists');
        } else if (deletedUser  === 1 && deletedList >= 1) { 
            res.status(200).send('The user was deleted and all your lists');            
        } else {
            res.status(400).send('Bad request');
            console.log("This many users was deleted: ", deletedUser);
            console.log("This many lists was deleted: ", deletedList);
            console.log("This many todos was deleted: ", deletedTodo);
        }
    } catch (error) {
        res.status(500).json(error);
    } 
}

module.exports = {
    getAllUserContent, remove
}