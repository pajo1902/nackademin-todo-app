const db = require('../database/dbSetup');
const bcrypt = require('bcryptjs');
const secret = process.env.secret;
const jwt = require('jsonwebtoken');

//registrera en användare
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

//logga in användaren
async function login(data) {
    const user = await db.users.findOne({ username: data.login.username });

    if (!user) {
        return {message: 'No user'}
    }
    const passwordAttempt = data.login.password;
    const success = bcrypt.compareSync(passwordAttempt, user.password);

    if (success) {
        const payload = {
            username: user.username,
            _id: user._id,
            role: user.role
        };
        const token = jwt.sign(payload, secret, { expiresIn: '30d' });
        
        return {
            user,
            token
        }
    } else {
        return {message: 'Unauthorized'}
    }
}

//hämta en användare
async function getUser(id) {
    return await db.users.findOne({ _id: id });
}

//ta bort en användare
async function removeUser(id) {
    return await db.users.remove({ _id: id });   
}

//ta bort alla test-användare
async function clearTestUsers() {
    return await db.users.remove({}, { multi: true });
}

module.exports = {
    register, login, getUser, clearTestUsers, removeUser
};
