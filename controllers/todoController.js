// const express = require('express');
const todoModel = require('../models/todoModel.js');
const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const secret = process.env.secret
// const secret = 'hemligt';

//registrera ny användare
async function register(req, res) {
    let data = req.body;
    console.log('data från controllern: ', data)

    try {
        let result = await userModel.register({ data });
        console.log('result inne i controllern:', result)
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
        console.log('HÄÄÄÄR')
    }
}

//logga in användaren
async function login(req, res) {
    const login = req.body;
    const payload = await userModel.getUser(req.body.username);
    console.log('payloaden ifrån controllern: ', payload)

    const token = jwt.sign(payload, secret, { expiresIn: '30d' });
    console.log('TOKEN: ', token);

    try {
        const result = await userModel.login({ login });
        console.log('results vid inloggning: ', result)
        res.status(200).json({
            message: 'Success',
            token: token,
            data: result
        })
    } catch (err) {
        res.status(500).json(err);
        console.log('gick åt pipan!')
    }
}

//hämta alla todos
async function getAll(req, res) {
    let todoItems = await todoModel.getAllTodoItems()
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
        typeof req.body.title === 'string' &&
        typeof req.body.content === 'string',
        typeof req.body.done === 'string' // && typeof req.body.done == bolean
    ) {
        let todoItem = req.body

        console.log('Den nya skapade todoItemet: ', todoItem)

        try {
            let result = await todoModel.postTodoItem(todoItem);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(400).send('Bad Request')

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
    post, getAll, get, remove, put, register, login
}
