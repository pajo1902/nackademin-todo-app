//Controllern:
//Logic for handling request
//Interaction with Models
//Logic for sending a response(res)

const todoModel = require('../models/todoModel.js');
const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const secret = process.env.secret
// const secret = 'hemligt';

//hämta alla todos
async function getAll(req, res) {
    let user = req.user._id;
    // console.log('USER: ', user)
    
    try {
        let todoItems = await todoModel.getAllTodoItems(user)
        res.status(200).json(todoItems)
        // if (todoItems) {
        //     console.log(todoItems)
        //     res.status(200).json(todoItems)
        // } else {
        //     res.status(404).send('Not Found')
        // }
    } catch (err) {
        res.status(500).json(err)
    }
}

//hämta en todo
async function get(req, res) {
    try {
        let todoItem = await todoModel.getOneTodoItem()

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
        typeof req.body.done === Boolean,
        typeof req.body.urgent === Boolean,
        typeof req.body.listId === 'string' 
    ) {
        // req.body.createdBy = req.user._id;
        // let todoItem = req.body

        // console.log('Den nya skapade todoItemet: ', todoItem)

        try {
            // const title = req.body.title;
            // const content = req.body.content;
            // const done = req.body.done;
            // const urgent = req.body.urgent;
            // const listId = req.body.listId;
            // const createdBy = req.body.createdBy;

            const todoItem = {
                title: req.body.title, 
                content: req.body.content,
                done: req.body.done, 
                urgent: req.body.urgent,
                listId: req.body.listId,
                createdBy: req.user._id 
            }

            const result = await todoModel.postTodoItem(todoItem);
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

// async function get(req, res) {
//     try {
//         const todoItem = await todoModel.getOneTodoItem()

//         if (todoItem) {
//             console.log(todoItem)
//             res.status(200).json(todoItem)
//         } else {
//             res.status(404).send('Not Found!')
//         }
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

//hämta alla listor
async function getAllLists(req, res) {
    try {
        const userId = req.params.id;
        const todoList = await todoModel.getAllTodoLists(userId);

        if (todoList) {
            console.log(todoList)
            res.status(200).json(todoList)
        } else {
            res.status(404).send('Not Found!')
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

//ta bort en todo
async function remove(req, res) {
    let todoItem = req.params.id;
    let deletedItem = await todoModel.removeTodoItem({_id: todoItem});

    if (deletedItem === 0) {
        res.status(404).send('Not Found')
    } else if (deletedItem === 1) {
        res.status(200).send('OK');
    } else {
        res.status(500).send('Something went really bad man!');
    }
}

//uppdatera en todo
async function put(req, res) {
    let result = await todoModel.updateTodoItem(req.params.id, req.body)
    
    res.send('Du har uppdaterat ett item ' + result);
}

module.exports = {
    post, getAll, get, remove, put, postList, getAllLists
}
