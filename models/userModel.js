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

async function register(username, password, role) {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        const user = {
            username : username,
            password : hashPass,
            role : role
        }

        const createdUser = await User.create(user);
        return createdUser._doc;
    } catch (error) {
        return error; 
    }
}

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

async function getUser(id) {
    try {
        const user = await User.findOne({ _id: id });
        return user;
    } catch (error) {
        return error
    }
}

async function removeUser(id) {
    try {
        const deleted = await db.users.deleteOne({ _id: id });
        return deleted;
    } catch (error) {
        return error;
    }
}

async function clearTestUsers() {
    try {
        const deleted = await User.deleteMany({});
        return deleted;
    } catch (error) {
        return error
    }
}

module.exports = {
    register, login, getUser, clearTestUsers, removeUser
};
