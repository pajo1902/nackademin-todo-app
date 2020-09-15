//Controllern:
//Logic for handling request
//Interaction with Models
//Login for sending a response(res)

const userModel = require('../models/userModel.js');
const todoModel = require('../models/todoModel.js');

//registrera ny användare
async function register(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const role = req.body.role;
        const result = await userModel.register(username, password, role);
        // console.log('result inne i controllern:', result)
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}

//logga in användaren
async function login(req, res) {
    const login = req.body;
    // console.log('controller logindetails', login);

    try {
        const result = await userModel.login({ login });
        // console.log('results vid inloggning: ', result)
        // console.log('SÅ HÄR SER REQ UT: ', login);
        res.status(200).json({
            message: 'Success',
        //    token: token,
            ...result
        })
    } catch (err) {
        res.status(403).json(err);
        console.log('gick åt pipan!');
        console.log(err)
    }
}

//ta bort användare
async function remove(req, res) {

    const userId = req.params.id;
    const deletedUser = await userModel.removeUser(userId);
    const deletedTodo = await todoModel.removeTodoItem({createdBy: userId });

    if (deletedUser === 0) {
        res.status(404).send('The user didnt exist!');
    } else if (deletedTodo  === 0) {
        res.status(200).send('The user was deleted but there werent any todos');
    } else if (deletedTodo > 0) { 
        res.status(200).send('The user was deleted and all your todos');            
    } else {
        res.status(500).send('Something went really bad man!');
        console.log("deleteUser: ", deletedUser);
        console.log("deleteTodo: ", deletedTodo);
    }
}

//hämta en användares all data inklusive todos, listor och användaruppgifter
async function getAllUserContent(req, res) {
    try {
        const userId = req.params.id;
        const userData = await userModel.getUser(userId);
        const todoLists = await todoModel.getAllTodoLists(userId);
        const todoItems = await todoModel.getAllTodoItems(userId);
        console.log("userdata: ", userData);
        if (userData) {
            res.status(200).send({ 
                userData, todoLists, todoItems
            });
        } else {
            console.log('fan nåt gick åt skogen!');
        }
    } catch (err) {
        res.status(403).json(err);
    }
}

module.exports = {
    register, login, remove, getAllUserContent
}
