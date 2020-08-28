// const express = require('express');
const models = require('../models/todoModel.js');


//hämta alla items
async function getAll(req, res) {
    let todoItems = await models.getAllTodoItems()
    try {
        if (todoItems) {
            console.log(todoItems)
            res.status(200).json(todoItems)
        } else {
            res.status(404).send('Not Found')
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

//hämta en item
async function get(req, res) {
    try {
        let todoItem = await models.getOneTodoItem(req.params.id)

        if (todoItem) {
            console.log(todoItem)
            res.status(200).json(todoItem)
        } else {
            res.status(404).send('Not Found!')
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

//skapa ett nytt item
async function post(req, res) {
    if (req.body.hasOwnProperty('title') &&
        req.body.hasOwnProperty('content') &&
        req.body.hasOwnProperty('done') &&
        typeof req.body.title === 'string' &&
        typeof req.body.content === 'string',
        typeof req.body.done === 'string' // && typeof req.body.done == bolean
    ) {
        let todoItem = req.body

        console.log('Den nya skapade todoItemet: ', todoItem)

        try {
            let result = await models.postTodoItem(todoItem);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(400).send('Bad Request')

    }
}

//ta bort ett item
async function remove(req, res) {
    let todoItem = req.params.id
    let deletedItem = await models.removeTodoItem(todoItem);

    if (deletedItem === 0) {
        res.status(404).send('Not Found')
    } else if (deletedItem === 1) {
        res.status(200).send('OK')
    } else {
        res.status(500).send('Something went really bad man!')
    }
}

//uppdatera ett item
async function put(req, res) {
    let result = await models.updateTodoItem(req.params.id, req.body)
    
    res.send('Du har uppdaterat ett item ' + result);
}

module.exports = {
    post, getAll, get, remove, put
}
