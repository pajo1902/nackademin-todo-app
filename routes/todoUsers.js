const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController.js');

//REGISTER and LOGIN

//register
router.post('/register', todoController.register);

//login
router.post('/auth/login', todoController.login);

module.exports = router;