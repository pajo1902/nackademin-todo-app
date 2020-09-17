const userModel = require('../models/userModel.js');

//registrera ny användare
async function register(req, res) {
    if (req.body.hasOwnProperty('username') &&
        req.body.hasOwnProperty('password') &&
        typeof req.body.username === 'string',
        typeof req.body.password === 'string'
    ) {
        try {
            let role;
            if (!req.body.role) {
                role = "user";
            } else {
                role = req.body.role;
            }
            const username = req.body.username;
            const password = req.body.password;
            console.log("username: ", username)
            console.log("password: ", password)
            console.log("password: ", role)

            const result = await userModel.register(username, password, role);
            console.log("Result: ", result)
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(400).send('Bad Request, need to specify username and password')
    }
}

//logga in användaren
async function login(req, res) {
    try {
        const login = req.body;
        const result = await userModel.login({ login });
        res.status(200).json({
            message: 'Success',
            ...result
        })
    } catch (error) {
        res.status(403).json(error);
        console.log('Forbidden');
        console.log(error)
    }
}

module.exports = {
    register, login
}
