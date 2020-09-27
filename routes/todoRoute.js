const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController.js');
const { authMiddleware, admin, user } = require('../middlewares/auth');

router.get('/', authMiddleware, todoController.getAll);

router.get('/:id', authMiddleware, todoController.get);

router.post('/', authMiddleware, todoController.post);

router.delete('/:id', authMiddleware, admin, todoController.remove);

router.put('/:id', authMiddleware, user, todoController.put);

module.exports = router;