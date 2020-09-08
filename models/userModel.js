//Modellen:
//Database logic for creating a resource etc.
//May return some data about the operation
//or throw an exception if an error occurs
//Do not use res or req

const db = require('../database/dbSetup');
const bcrypt = require('bcryptjs');
const secret = process.env.secret;
const jwt = require('jsonwebtoken');

async function register(username, password, role) {
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt)
    const user = {
        username : username,
        password : hashPass,
        role : role
    }
    return db.users.insert(user);
}

async function login(data) {
    let user = await db.users.findOne({ username: data.login.username });
    if (!user) {
        return {message: 'No user'}
    }
    console.log('usern som hittas ifrån databasen: ', user);

    let passwordAttempt = data.login.password;
    const success = bcrypt.compareSync(passwordAttempt, user.password);
    console.log('success ifrån modellen: ', success);

    if (success) {
        const payload = {
            username: user.username,
            _id: user._id,
            role: user.role
        };
        const token = jwt.sign(payload, secret, { expiresIn: '30d' });
        
        return {
            user, //... om jag skriver så innan user så slipper jag skriver user.username för att få ut username.
            token
        }
    } else {
        return {message: 'Unauthorized'}
    }
}

async function getUser(data) {
    console.log('data ifrån modellen: ' + data);
    let username = data;
  
    return await db.users.findOne({ username });

    // return username;
}

async function clearTestUsers() {
    const doc = await db.userTests.remove({}, { multi: true });
    return doc;
}

module.exports = {
    register, login, getUser, clearTestUsers
};
