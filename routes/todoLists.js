const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController.js');
const { authMiddleware } = require('../middlewares/auth');

//skapa en ny lista
router.post('/', authMiddleware, todoController.postList);

module.exports = router;