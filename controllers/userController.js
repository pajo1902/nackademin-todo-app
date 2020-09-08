//Controllern:
//Logic for handling request
//Interaction with Models
//Login for sending a response(res)

const userModel = require('../models/userModel.js');

//registrera ny användare
async function register(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const role = req.body.role;
        const result = await userModel.register(username, password, role);
        console.log('result inne i controllern:', result)
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}

//logga in användaren
async function login(req, res) {
    const login = req.body;
    console.log('controller logindetails', login);

    try {
        const result = await userModel.login({ login });
        console.log('results vid inloggning: ', result)
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

module.exports = {
    register, login
}
