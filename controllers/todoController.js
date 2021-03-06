const todoModel = require('../models/todoModel.js');

async function post(req, res) {
    if (req.body.hasOwnProperty('title') &&
        req.body.hasOwnProperty('listId') &&
        typeof req.body.title === 'string',
        typeof req.body.done === Boolean,
        typeof req.body.urgent === Boolean,
        typeof req.body.listId === 'string' 
    ) {
        try {
            const todoItem = {
                title: req.body.title, 
                done: false, 
                urgent: false,
                listId: req.body.listId,
                createdBy: req.user._id
            }

            const result = await todoModel.postTodoItem(todoItem);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(400).send('Bad Request, need to specify title and listId')
    }
}

async function get(req, res) {
    try {
        let todoItem = await todoModel.getOneTodoItem(req.params.id);

        if (todoItem) {
            res.status(200).json(todoItem)
        } else {
            res.status(404).send('Not Found!')
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

async function getAll(req, res) {
    try {
        const user = req.user._id;
        const todoItems = await todoModel.getAllTodoItems(user)
        res.status(200).json(todoItems);
    } catch (err) {
        res.status(500).json(err)
    }
}

async function put(req, res) {
    try {
        await todoModel.updateTodoItem(req.params.id, req.body);
        res.send('Dude you have updated a todo!');
    } catch (error) {
        res.status(500).json(err);
    }
}

async function remove(req, res) {
    const todoItem = req.params.id;
    const deletedItem = await todoModel.removeTodoItem({_id: todoItem});

    if (deletedItem === 0) {
        res.status(404).send('Not Found');
    } else if (deletedItem === 1) {
        res.status(200).send('OK');
    } else {
        res.status(500).send('Something went really bad man!');
    }
}

module.exports = {
    post, getAll, get, remove, put
}
