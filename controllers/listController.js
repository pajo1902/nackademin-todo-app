const listModel = require('../models/listModel.js');

//skapa en ny lista
async function postList(req, res) {
    try {
        const todoList = {
            title: req.body.title,
            createdBy: req.user._id 
        }

        const result = await listModel.postTodoList(todoList);
        res.status(201).json(result);
        console.log(result)
    } catch (error) {
        res.status(500).json(error);
    }
}

//hämta alla listor
async function getAllLists(req, res) {
    try {
        const userId = req.params.id;
        const todoList = await listModel.getAllTodoLists(userId);

        if (todoList) {
            console.log(todoList)
            res.status(200).json(todoList)
        } else {
            res.status(404).send('Not Found!');
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

//ta bort en lista
async function removeList(req, res) {
    try {
        const listId = req.params.id;
        const deletedList = await listModel.removeList({_id: listId});

        if (deletedList === 0) {
            res.status(404).send('Not Found')
        } else if (deletedList === 1) {
            res.status(200).send('OK');
        } else {
            res.status(400).send('Bad request');
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    postList, getAllLists, removeList
}