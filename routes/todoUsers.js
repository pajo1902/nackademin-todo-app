const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController.js');

//REGISTER and LOGIN

//register
router.post('/', todoController.register);

//login
router.post('/auth/login', todoController.login); //ska jag ta bort även "login"?

module.exports = router;