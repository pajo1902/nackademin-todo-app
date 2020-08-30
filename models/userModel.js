const db = require('../database/dbSetup');
const bcrypt = require('bcryptjs');

async function register(data) {
    console.log('data ifrån modellen: ', data.data.username);
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(data.data.password, salt)
    // console.log('salt: ', salt)
    // console.log('hashPass: ', hashPass)
    let user = {
        username : data.data.username,
        password : hashPass,
        role : data.data.role
    }
    // console.log(user)
    return db.users.insert(user);
}

async function login(data) {
    console.log('LOGIN data från modellen: ', data);
    console.log('HÄÄÄR:', db.users)
    let user = await db.users.findOne({ username: data.login.username });
    console.log('usern som hittas ifrån databasen: ', user);

    let passwordAttempt = data.login.password;
    const success = bcrypt.compareSync(passwordAttempt, user.password);
    console.log('success ifrån modellen: ', success);

    if (success) {
        return user;
    } else {
        res.status(401).json('Unauthorized');
    }
}

async function getUser(data) {
    console.log('data ifrån modellen: ' + data);
    let username = data;
  
    return db.users.findOne({ username });
}

module.exports = {
    register, login, getUser
};
