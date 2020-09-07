const todoModel = require('../models/todoModel.js');
const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const secret = process.env.secret;

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

    const token = jwt.sign(payload, secret, { expiresIn: '30d' }); //denna kanske borde finnas i modellen. kanske i en egen authmodell
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

module.exports = {
    register, login
}
