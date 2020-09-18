// const db = require('../database/dbSetup');
const mongoose = require('mongoose')
require('dotenv').config()
const bcrypt = require('bcryptjs');
const secret = process.env.secret;
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true },
    password: String,
    role: String
});

const User = mongoose.model('User', userSchema);

//registrera en användare
async function register(username, password, role) {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        const user = {
            username : username,
            password : hashPass,
            role : role
        }
        console.log(user);

        const createdUser = await User.create(user);
        return createdUser._doc;
    } catch (error) {
        return error; 
    }
}

//logga in användaren
async function login(data) {
    const user = await User.findOne({ username: data.login.username });

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
    return await User.findOne({ _id: id });
}

//ta bort en användare
async function removeUser(id) {
    return await db.users.deleteOne({ _id: id });   
}

//ta bort alla test-användare
async function clearTestUsers() {
    return await User.deleteMany({});
}

module.exports = {
    register, login, getUser, clearTestUsers, removeUser
};
