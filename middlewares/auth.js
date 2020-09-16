const jwt = require('jsonwebtoken')
const secret = process.env.secret
require('dotenv').config()

const authMiddleware = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.sendStatus(401)
    }

    try {
        const user = jwt.verify(req.headers.authorization.replace("Bearer ", ""), secret)
        req.user = user
        next()
    } catch (error) {
        console.error(error)
        res.sendStatus(401)
    }
}

const user = (req, res, next) => {
    if (req.user.role === 'admin' || req.user.role === 'user') {
        next()
    } else {
        console.log("Du har inte behörighet!")
        return res.sendStatus(401)
    }
}
const admin = (req, res, next) => {
    if(req.user.role === 'admin'){
        next()
    } else {
        console.log('Du har inte behörighet!')
        return res.sendStatus(401)
    }
}

module.exports = {
    authMiddleware,
    admin,
    user
};