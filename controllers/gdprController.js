const userModel = require('../models/userModel.js');
const listModel = require('../models/listModel.js');
const todoModel = require('../models/todoModel.js');

async function getAllUserContent(req, res) {
    try {
        const userId = req.params.id;
        const userData = await userModel.getUser(userId);
        const todoLists = await listModel.getAllTodoLists(userId);
        const todoItems = await todoModel.getAllTodoItems(userId);
        if (userData) {
            res.status(200).send({ 
                userData, todoLists, todoItems
            });
        } else {
            res.status(400).send('Bad request');
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

async function remove(req, res) {
    try {
        const userId = req.params.id;
        const deletedList = await listModel.removeList({createdBy: userId });
        const deletedTodo = await todoModel.removeTodoItem({createdBy: userId });
        const deletedUser = await userModel.removeUser(userId);

        if (deletedUser === 0) {
            res.status(404).send('The user didnt exist!');
        } else if (deletedUser  === 1 && deletedList === 0) {
            res.status(200).send('The user was deleted and there werent any lists');
        } else if (deletedUser  === 1 && deletedList >= 1) { 
            res.status(200).send('The user was deleted and all its lists');            
        } else {
            res.status(400).send('Bad request');
        }
    } catch (error) {
        res.status(500).json(error);
    } 
}

async function privacypolicy(req, res) {
    //här ska det finnas privacy policy
};

module.exports = {
    getAllUserContent, remove, privacypolicy
}