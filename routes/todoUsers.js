const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

//REGISTER and LOGIN

//register
router.post('/register', userController.register);

//login
router.post('/auth/login', userController.login); //ska jag ta bort även "login"?

module.exports = router;