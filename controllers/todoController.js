// const express = require('express');
const todoModel = require('../models/todoModel.js');
const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const secret = process.env.secret
// const secret = 'hemligt';

//hämta alla todos
async function getAll(req, res) {
    let user = req.user._id;
    // console.log('USER: ', user)
    let todoItems = await todoModel.getAllTodoItems(user)
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

//hämta en todo
async function get(req, res) {
    try {
        let todoItem = await todoModel.getOneTodoItem(req.params.id)

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

//skapa en ny todo
async function post(req, res) {
    if (req.body.hasOwnProperty('title') &&
        req.body.hasOwnProperty('content') &&
        req.body.hasOwnProperty('done') &&
        req.body.hasOwnProperty('urgent') &&
        req.body.hasOwnProperty('listId') &&
        typeof req.body.title === 'string',
        typeof req.body.content === 'string',
        typeof req.body.done === 'string', // && typeof req.body.done == bolean
        typeof req.body.urgent === 'string', // && typeof req.body.urgent == bolean
        typeof req.body.listId === 'string' // && typeof req.body.urgent == bolean
    ) {
        req.body.createdBy = req.user._id;
        console.log(req.body);
        // console.log('USSSEEER: ', user);
        let todoItem = req.body

        console.log('Den nya skapade todoItemet: ', todoItem)

        try {
            let result = await todoModel.postTodoItem(todoItem);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(400).send('Bad Request, need to specify title, content, done, urgent, listId')

    }
}

//skapa en ny lista
async function postList(req, res) {
    req.body.createdBy = req.user._id;
    console.log(req.body);
    let todoList = req.body;

    console.log('Den nya skapade todoListan: ', todoList)

    try {
        let result = await todoModel.postTodoList(todoList);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
}

//ta bort en todo
async function remove(req, res) {
    let todoItem = req.params.id
    let deletedItem = await todoModel.removeTodoItem(todoItem);

    if (deletedItem === 0) {
        res.status(404).send('Not Found')
    } else if (deletedItem === 1) {
        res.status(200).send('OK')
    } else {
        res.status(500).send('Something went really bad man!')
    }
}

//uppdatera en todo
async function put(req, res) {
    let result = await todoModel.updateTodoItem(req.params.id, req.body)
    
    res.send('Du har uppdaterat ett item ' + result);
}

module.exports = {
    post, getAll, get, remove, put, postList
}
